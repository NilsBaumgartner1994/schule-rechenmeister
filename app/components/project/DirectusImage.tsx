import React, { useEffect, useState} from 'react';
import {Image, ImageSource} from 'expo-image';
import {TouchableOpacity} from 'react-native';
import {ServerAPI} from '@/helper/database/server/ServerAPI';
import {Text, View} from '@/components/Themed';
import {useAccessToken} from '@/states/User';
import {thumbHashStringToDataURL} from '@/helper/image/ThumbHashHelper';
import {useIsDemo} from '@/states/SynchedDemo';
import {DirectusImageDemoSources} from '@/components/project/DirectusImageDemoSources';
import {useIsDebug} from '@/states/Debug';
import {DirectusFiles} from '@/helper/database/databaseTypes/types';
import {AssetHelperDirectus, ImageTransform} from "@/helper/database/assets/AssetHelperDirectus";

export type DirectusImageProps = {
    assetId: string | DirectusFiles | undefined | null;
	imageTransform?: ImageTransform;
    image_url?: string | undefined | null;
    style?: any;
    alt?: string;
    fallbackImage?: string;
	fallbackAssetId?: string;
    thumbHash?: string | undefined | null;
    showLoading?: boolean,
    contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down',
    fallbackElement?: any,
    onPress?: () => {}
}

export default function DirectusImage(props: DirectusImageProps) {
	const accessToken = useAccessToken();
	const isDemoMode = useIsDemo();
	const isDebug = useIsDebug();

	const url: string | undefined = getInitialImageUrl();

	// State for managing the image URL
	const [imageUrl, setImageUrl] = useState<string | undefined>(url);

	function getInitialImageUrl() {
		let url = AssetHelperDirectus.getAssetImageURL(props.assetId, props.imageTransform);
		if (!url && props.image_url) {
			url = props.image_url;
		}
		return url;
	}

	const state_failed = "failed";
	const state_loading = "loading";
	const state_success = "success";

	function getInitialLoadState(url: string | null | undefined){
		return !url ? state_failed : state_loading;
	}

	const initialState = getInitialLoadState(url);
	const [loadState, setLoadState] = useState(initialState)
	const loadFinished = loadState !== state_loading;
	const imageLoadedFailed = loadState === state_failed;
	const imageLoadedSuccess = loadState === state_success;

	useEffect(() => {
		const url = getInitialImageUrl();

		setImageUrl(url); // Update the imageUrl state with the new URL
		setLoadState(getInitialLoadState(url))
	}, [props.assetId, props.image_url]); // This effect depends on assetId and image_url

	let headers = undefined;
	if (accessToken) {
		if(!!url){
			if(url.startsWith(ServerAPI.getServerUrl())){
				headers = {
					Authorization: `Bearer ${accessToken}`,
				};
			}
		}
	}

	let source: ImageSource = {
		uri: imageUrl,
		cacheKey: imageUrl,
		headers: headers,
	};

	if (isDemoMode) {
		const demoSource = DirectusImageDemoSources.getSource(props.assetId);
		if (demoSource) {
			source = demoSource;
		}
	}


	// Will only cache the image on mobile devices - not in the browser
	let cachePolicy: "none" | "disk" | "memory" | "memory-disk" | null | undefined = 'disk';

	const defaultThumbHash = '93 18 0A 35 86 37 89 87 80 77 88 8C 79 28 87 78 08 84 85 40 48';
	const thumbHashRaw = props.thumbHash || defaultThumbHash
	const thumbHashBase64 = thumbHashStringToDataURL(thumbHashRaw)
	let fallbackImage: any = props.fallbackImage
	if (props.fallbackAssetId) {
		fallbackImage = AssetHelperDirectus.getAssetImageURL(props.fallbackAssetId, );
	}

	let placeHolderContent = null;
	if(!loadFinished && thumbHashRaw){
		placeHolderContent = null;
	} else if (fallbackImage && imageLoadedFailed) {
		let placeholderSource = {
			uri: fallbackImage,
			cacheKy: fallbackImage,
			headers: headers,
		};
		placeHolderContent = (
			<View style={{
				height: '100%',
				width: '100%',
				position: 'absolute',
			}}>
				<Image
					source={placeholderSource}
					alt={props?.alt || 'Placeholder'}
					style={props.style}
					contentFit={props.contentFit}
					//placeholder={placeholder} // This is not working as expected
					// Assuming cachePolicy is determined elsewhere or is static
					cachePolicy={cachePolicy}
				/>
			</View>
		);
	}


	let renderedThumbHash: any = <View style={{
		height: '100%',
		width: '100%',
		position: 'absolute',
	}}>
		<Image
			source={thumbHashBase64}
			alt={props?.alt || 'Image blurry'}
			style={props.style}
		/>
	</View>

	if(loadFinished){
		if(fallbackImage || imageLoadedSuccess){
			renderedThumbHash = null;
		}
	}

	if(imageLoadedSuccess){
		renderedThumbHash = null;
	}


	// so we have: thumbhash, placeholder and the image and the fallbackElement
	// we want to first render the thumbhash, then the image and if all fails the placeholder or the fallbackElement



	let imageContent = (
		<Image
			source={source}
			accessibilityLabel={props?.alt || 'Image not found'}
			style={props.style}
			contentFit={props.contentFit}
			//placeholder={placeholder} // This is not working as expected
			onLoad={() => {
				//console.log('DirectusImage onLoad');
				setLoadState(state_success)
			}}
			onError={(e) => {
				//console.log('DirectusImage onError', e);
				setLoadState(state_failed)
			}}
			// Assuming cachePolicy is determined elsewhere or is static
			cachePolicy={cachePolicy}
		/>
	)

	if (imageLoadedFailed && props?.fallbackElement) {
		imageContent = props?.fallbackElement
	}

	// with resizeMode="contain" the image will be scaled to fit the container, but maintain its aspect ratio
	let content = (
		<>
			{imageContent}
			{renderedThumbHash}
			{placeHolderContent}
		</>
	);



	if (props.onPress) {
		content = (
			<TouchableOpacity onPress={props.onPress} style={props.style}>
				{content}
			</TouchableOpacity>
		);
	}

	let debugContent = null;
	if (isDebug) {
		const image_asset_id_or_url = props.image_url || (props.assetId ? props.assetId.toString() : '');

		debugContent = (
			<View style={{position: 'absolute', top: 0, left: 0}}>
				<Text>{image_asset_id_or_url}</Text>
				<Text>{"loadState: "+loadState}</Text>
			</View>
		);
	}

	return (
		<View style={props.style}>
			{content}
			{debugContent}
		</View>
	);
}
