import React from 'react';
import {AuthProvider, ServerAPI} from '@/helper/database/server/ServerAPI';
import {useIsDebug} from '@/states/Debug';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {ButtonAuthProviderCustom} from '@/components/buttons/ButtonAuthProviderCustom';
import {CommonSystemActionHelper} from '@/helper/device/CommonSystemActionHelper';
import {isInExpoGoDev} from '@/helper/device/DeviceRuntimeHelper';
// The component to handle SSO login links
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import {UrlHelper} from "@/helper/UrlHelper";
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";
import {View, Text} from "@/components/Themed";
import {Platform} from "react-native";
import {PlatformHelper} from "@/helper/PlatformHelper";
import Regexp from "ajv-keywords/src/keywords/regexp";

// Define the type for Single Sign-On (SSO) providers
type ButtonAuthProviderProps = {
    provider: AuthProvider,
	onSuccess?: (token: string) => void,
	onError?: (error: any) => void,
}

/**
 * New flow supports SSO login with Expo Go
function isSsoLoginPossible() {
	if (isInExpoGoDev()) { // app is running in expo go but on local ip (192....),
		// which means the redirect url would not trigger the deep link,
		// resulting in not opening the app,
		// so the SSO login does not work
		return false;
	}
	return true;
}
	*/


export const ButtonAuthProvider = ({ provider, onError, onSuccess }: ButtonAuthProviderProps) => {
	const isDebug = useIsDebug();
	const translation_log_in_with = useTranslation(TranslationKeys.sign_in_with);

	const [modalConfig, setModalConfig] = useModalGlobalContext();

	let providerName = provider.name;
	providerName = providerName.charAt(0).toUpperCase() + providerName.slice(1);

	const accessibilityLabel = translation_log_in_with + ': ' + providerName;
	let text = translation_log_in_with + ': ' + providerName;

	const url = ServerAPI.getUrlToProviderLogin(provider);
	//const disabled = !isSsoLoginPossible();
	const disabled = false; // New flow supports SSO login with Expo Go

	if (disabled) {
		text += '\nDoes not work on local ExpoGo';
	}

	if (isDebug) {
		text += '\nDebug: URL: ' + url;
	}

	const onPress = async () => {
		if (PlatformHelper.isWeb()) {
			const WEB_CHECK_INTERVAL = 25; // ms , set to 25ms to get a fast response

			// Web-specific logic
			const authWindow = window.open(url, '_blank', 'width=500,height=600');
			const authCheckInterval = setInterval(() => {
				if(!!authWindow){
					try {
						if (authWindow.closed) {
							clearInterval(authCheckInterval);
						} else {
							const redirectUrl = new URL(authWindow.location.href);
							const token = redirectUrl.searchParams.get(ServerAPI.getParamNameForDirectusAccessToken());
							if (token) {
								authWindow.close();
								console.log('Token found in URL: ' + token);
								clearInterval(authCheckInterval);
								if(onSuccess) {
									onSuccess(token);
								}
							}
						}
					} catch (e: any) {
						// Handle errors if needed
						if(onError) {
							onError(e);
						}
					}
				}
			}, WEB_CHECK_INTERVAL);
		} else {
			// Mobile-specific logic
			const result = await WebBrowser.openAuthSessionAsync(url, UrlHelper.getURLToLogin());
			console.log("ButtonAuthProvider result: ", result);

			if (result.type === 'success' && result.url) {
				try {
					console.log("############");
					console.log("ButtonAuthProvider result.url: ", result.url);

					const directus_refresh_token_param_name = ServerAPI.getParamNameForDirectusAccessToken()
					const match = result.url.match(new RegExp(directus_refresh_token_param_name + '=([^&]*)'))
					let directusToken = match ? match[1] : null
					if(!!directusToken && directusToken.endsWith('#')) { // remove trailing # if present
						directusToken = directusToken.substring(0, directusToken.length - 1);
					}

					if (directusToken) {
						console.log('Token found in URL: ' + directusToken);

						/**
						setModalConfig({
							key: 'sort',
							label: 'success ' + directusToken,
							title: 'success: ' + directusToken,
							accessibilityLabel: 'success',
							renderAsContentPreItems: (key: string, hide: () => void) => (
								<View style={{ width: '100%', height: '100%' }}>
									<Text>{'result.url: ' + result.url}</Text>
									<Text>{'Success: ' + directusToken}</Text>
								</View>
							),
						});
						*/

						console.log('Success: ' + directusToken);

						if(onSuccess) {
							onSuccess(directusToken);
						}
					} else {
						console.log('No token found in URL');
						//showErrorModal(result.url);
						if(onError) {
							onError('No token found in URL');
						}
					}
				} catch (e: any) {
					console.log('Error while parsing URL: ', e);
					//showErrorModal(result.url, e);
					if(onError) {
						onError(e);
					}
				}
			}
		}
	};


	return (
		// @ts-ignore
		<ButtonAuthProviderCustom
			key={'ssoButton' + provider.name}
			disabled={disabled}
			accessibilityLabel={accessibilityLabel}
			onPress={onPress}
			icon_name={provider.name}
			text={text}
		/>
	);
};
