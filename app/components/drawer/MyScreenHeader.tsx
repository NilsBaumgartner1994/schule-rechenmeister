import React from 'react';
import {Heading, Icon, Text} from '@/components/Themed'
import {DrawerHeaderProps, DrawerNavigationOptions, DrawerNavigationProp} from '@react-navigation/drawer';
import {MyTouchableOpacity} from '@/components/buttons/MyTouchableOpacity';
import { HeaderTitleProps, getHeaderTitle} from '@react-navigation/elements';
import {DrawerActions, ParamListBase, RouteProp} from '@react-navigation/native';
import {
	DrawerConfigPosition,
	useDrawerPosition,
	useIsDrawerPermanentVisible,
	useIsFullscreenModeFromSearchParam
} from '@/states/DrawerSyncConfig';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {Divider} from '@gluestack-ui/themed';
import {IconNames} from '@/constants/IconNames';
import {MyAccessibilityRoles} from '@/helper/accessibility/MyAccessibilityRoles';
import {Platform, View} from 'react-native';
import {useSafeAreaFrame, useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderShownContext from '@react-navigation/elements/src/Header/HeaderShownContext';
import {router, useFocusEffect, useNavigation} from 'expo-router';
import {PlatformHelper} from '@/helper/PlatformHelper';
import {BUTTON_DEFAULT_Padding} from "@/components/buttons/MyButtonCustom";
import {MyButton} from "@/components/buttons/MyButton";

/**
 * Defines the properties for the custom drawer header.
 *
 * @prop {DrawerNavigationProp<ParamListBase, string, undefined>} navigation - Navigation prop provided by React Navigation.
 * @prop {RouteProp<ParamListBase>} route - Route prop for the current screen.
 * @prop {DrawerNavigationOptions} options - Drawer navigation options.
 */
export type MyScreenHeaderPropsRequired = {
    navigation: DrawerNavigationProp<ParamListBase, string, undefined>
    route: RouteProp<ParamListBase>
    options: DrawerNavigationOptions
}

export type MyScreenHeaderPropsOptional = {
    custom_title?: string
    custom_renderHeaderDrawerOpposite?: renderHeaderContentElement
    hideDivider?: boolean,
	navigateHome?: boolean,
	navigateHomeIcon?: string,
	navigateHomeText?: string,
	navigateToRoute?: string
	onPress: () => void
}

export type MyScreenHeaderProps = MyScreenHeaderPropsRequired & MyScreenHeaderPropsOptional;

/**
 * Factory function to generate a custom drawer header component.
 *
 * @returns A React component function taking `MyDrawerHeaderProps` as props.
 */
export type getMyScreenHeaderFunction = () => (props: DrawerHeaderProps) => React.ReactNode

export const getMyScreenHeader: getMyScreenHeaderFunction = () => {
	return (props: MyScreenHeaderPropsRequired) => (
		<MyScreenHeader {...props} />
	);
}

/**
 * Type definition for a function that renders a header component.
 * This can be used for headerLeft, headerRight, or potentially other header components.
 */
export type renderHeaderContentElement = ((props?: {
    tintColor?: string | undefined,
    pressColor?: string | undefined,
    pressOpacity?: number | undefined,
    labelVisible?: boolean | undefined
}) => React.ReactNode) | undefined

/**
 * The main component for rendering a custom drawer header.
 * This component configures the header title and optional left or right icons for toggling the drawer.
 *
 * @param navigation
 * @param route
 * @param options
 * @param custom_title
 * @param custom_renderHeaderDrawerOpposite
 * @param hideDivider
 * @param {MyScreenHeaderPropsRequired} props - The properties for configuring the drawer header.
 * @returns A React element representing the custom drawer header.
 */
export const MyScreenHeader = ({ navigation, route, options, custom_title, custom_renderHeaderDrawerOpposite, hideDivider, ...props }: MyScreenHeaderProps) => {
	// @ts-ignore this field might be undefined
	const showBackButton = options?.showBackButton;

	let secondaryHeaderContent: React.ReactNode = null; // Initialize headerRight as undefined.
	if (custom_renderHeaderDrawerOpposite) {
		secondaryHeaderContent = custom_renderHeaderDrawerOpposite();
	}

	const default_title = getHeaderTitle(options, route.name); // Retrieves the title for the header based on navigation options.
	const usedTitle = custom_title || default_title

	const navigateHome = props.navigateHome || undefined;
	const navigateToRoute = props.navigateToRoute || undefined
	const navigateHomeIcon = props.navigateHomeIcon || undefined
	const navigateHomeText = props.navigateHomeText || undefined
	const onPress = props.onPress

	return <MyScreenHeaderCustom onPress={onPress} navigateToRoute={navigateToRoute} navigateHomeText={navigateHomeText} navigateHome={navigateHome} navigateHomeIcon={navigateHomeIcon} title={usedTitle} headerStyle={options.headerStyle} showBackButton={showBackButton} secondaryHeaderContent={secondaryHeaderContent} hideDivider={hideDivider} />
}




export type MyScreenHeaderCustomProps = {
	title: string
	headerStyle?: any
	showBackButton: boolean
	secondaryHeaderContent?: React.ReactNode
	hideDivider?: boolean,
	navigateHome?: boolean,
	navigateHomeIcon?: string,
	navigateHomeText?: string,
	navigateToRoute?: string,
	onPress: () => void
}
/**
 * The main component for rendering a custom drawer header.
 * This component configures the header title and optional left or right icons for toggling the drawer.
 *
 * @param title
 * @param headerStyle
 * @param showBackButton
 * @param secondaryHeaderContent
 * @param hideDivider
 * @param {MyScreenHeaderCustomProps} props - The properties for configuring the drawer header.
 * @returns A React element representing the custom drawer header.
 */
export const MyScreenHeaderCustom = ({ title, headerStyle, showBackButton, secondaryHeaderContent, hideDivider, ...props }: MyScreenHeaderCustomProps) => {
	const isDrawerPermanentVisible = useIsDrawerPermanentVisible(); // Determine if the device is considered large.
	const navigation = useNavigation(); // Get the navigation object for the current screen.

	const [drawerPosition, setDrawerPosition] = useDrawerPosition(); // Gets and sets the current drawer position (left/right).
	// @ts-ignore this field might be undefined

	const translation_open_drawer = useTranslation(TranslationKeys.open_drawer);
	const translation_navigate_back = useTranslation(TranslationKeys.navigate_back);

	const usedTitle = title

	// Adjust padding based on the drawer's position to align the icon appropriately.
	const paddingLeft: any = BUTTON_DEFAULT_Padding
	const paddingRight = BUTTON_DEFAULT_Padding
	const paddingVertical = BUTTON_DEFAULT_Padding

	/**
	 * Renders the header title element.
	 * Applies header style from navigation options to the title.
	 *
	 * @returns A React element representing the header title.
	 */
	const renderHeaderTitle = (isDrawerPositionRight: boolean) => {
		const readOnlyStyle: any = headerStyle;
		const headerPaddingHorizontal = isDrawerPermanentVisible ? paddingLeft : 0;
		const textAlignment = isDrawerPositionRight ? 'right' : 'left';

		return (
			<View style={{flex: 1, flexShrink: 1, paddingVertical: paddingVertical, paddingHorizontal: headerPaddingHorizontal }}>
				<Heading
					numberOfLines={2}
					ellipsizeMode="tail"
					accessibilityRole={MyAccessibilityRoles.Header}
					style={[readOnlyStyle, {textAlign: textAlignment }]}
				>
					{title}
				</Heading>
			</View>
		);
	};

	/**
	 * Optionally renders a drawer toggle icon.
	 * This function returns null on large devices where a drawer toggle might not be necessary.
	 * Adjusts padding based on the drawer position.
	 *
	 * @param {Object} props - Properties including tint color, press color, press opacity, and label visibility.
	 * @returns A React element for the drawer toggle button, or null.
	 */
	function renderDrawerIcon(props?: {
		tintColor?: string;
		pressColor?: string;
		pressOpacity?: number;
		labelVisible?: boolean;
		navigateHome?: boolean;
		navigateHomeIcon?: string;
		navigateHomeText?: string;
		onPress?: () => void
	}) {

		if(showBackButton || props?.navigateHome || props?.onPress){
			let icon = IconNames.drawer_menu_go_back_icon;
			if(drawerPosition === DrawerConfigPosition.Right){
				icon = IconNames.drawer_menu_go_back_rtl_icon;
			}
			if(props?.navigateHomeIcon){
				icon = props.navigateHomeIcon;
			}
			const navigateHomeText = props?.navigateHomeText || undefined

			// Returns a touchable component with an icon for toggling the drawer.
			return (
				<MyButton useOnlyNecessarySpace={true} text={navigateHomeText} tooltip={translation_navigate_back} accessibilityLabel={translation_navigate_back} useTransparentBorderColor={true} leftIcon={icon} {...props} onPress={() => {
					if(props?.onPress){
						props.onPress();
						return;
					}

					if(props?.navigateHome){
						router.push('/(app)/home');
						return;
					}

					if(navigation.canGoBack()){
						router.back();
					} else {
						// if we can't go back, we navigate to the home screen
						router.push('/(app)/home');
					}
				}} />
			)
		}

		if (isDrawerPermanentVisible) {
			return null
		}

		// Returns a touchable component with an icon for toggling the drawer.
		return (
			<MyButton useOnlyNecessarySpace={true} tooltip={translation_open_drawer} accessibilityLabel={translation_open_drawer} useTransparentBorderColor={true} leftIcon={IconNames.drawer_menu_icon} {...props} onPress={() => navigation.dispatch(DrawerActions.openDrawer)} />
		)
	}

	const isDrawerPositionRight = drawerPosition === DrawerConfigPosition.Right;
	let primaryHeaderContent = (
		<>
			{renderHeaderTitle(isDrawerPositionRight)}
		</>
	)

	// TODO: Refactor Header Title to also support align "right" instead of currently only "left" and "center"
	// Consideration for future improvement to allow more flexible title positioning.

	// make the header render order from left to right: headerLeft, headerTitle, headerRight

	let renderedDivider = hideDivider? null : <Divider />;
	renderedDivider = <Divider />

	const insets = useSafeAreaInsets();

	const isParentHeaderShown = React.useContext(HeaderShownContext);

	// On models with Dynamic Island the status bar height is smaller than the safe area top inset.
	const hasDynamicIsland = Platform.OS === 'ios' && insets.top > 50;
	const statusBarHeight = hasDynamicIsland ? insets.top - 5 : insets.top;
	const headerStatusBarHeight = isParentHeaderShown ? 0 : statusBarHeight

	// create a focusEffect to set the title of the window on web
	useFocusEffect(() => {
		if (PlatformHelper.isWeb()) {
			document.title = usedTitle
		}
	})

	return (
		<>
			<View style={{
				marginLeft: insets.left,
				marginRight: insets.right,
				marginTop: headerStatusBarHeight,
				flexDirection: 'row',
			}}
			>
				<View style={{
					flexDirection: isDrawerPositionRight? 'row-reverse' : 'row',
					justifyContent: 'space-between',
					flex: 1,
				}}>
					<View style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
					}}>
						{renderDrawerIcon({
							navigateHome: props.navigateHome,
							navigateHomeIcon: props.navigateHomeIcon,
							navigateHomeText: props.navigateHomeText,
							onPress: props.onPress,
							navigateToRoute: props.navigateToRoute
						})}
					</View>
					<View style={{
						flex: 1,
						flexDirection: isDrawerPositionRight? 'row-reverse' : 'row',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}>
						<View style={{
							flex: 1,
							flexDirection: 'row',
						}}>
							{primaryHeaderContent}
						</View>
						{secondaryHeaderContent}
					</View>
				</View>
			</View>
			{renderedDivider}
		</>
	)
}
