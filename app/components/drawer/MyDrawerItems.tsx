import React from 'react';
import {Text, View} from '@/components/Themed'
import {DrawerContentComponentProps} from '@react-navigation/drawer/src/types';
import {
	getMyDrawerCustomItemCenter,
	MyDrawerCustomItemBottom,
	MyDrawerCustomItemProps
} from '@/components/drawer/MyDrawerCustomItemCenter';
import {getMyDrawerItemExpoGenerated} from '@/components/drawer/MyDrawerItemExpoGenerated';
import {ParamListBase, RouteProp} from '@react-navigation/native';

/**
 * Since our custom drawer items may have an ID or parameter used, which is not shown in the drawer routeName, we need to check if the current route is the same as the customItem.onPressInternalRouteTo
 *
 * @param customItem
 * @param props
 */
function configureCustomDrawerItemActiveIfInternalRouteIsUsed(customItem: MyDrawerCustomItemProps, props: DrawerContentWrapperProps) {
	let internalPath = customItem.onPressInternalRouteTo; // our custom item has a route where the user will be navigated to
	if (internalPath) { // if the custom item has a route
		if (internalPath.startsWith('/')) { // we will ignore if the first character is a slash
			internalPath = internalPath.substring(1);
		}

		const history = props.state.history;
		let latestRoute = undefined
		for (let i = history.length - 1; i >= 0; i--) {
			const route = history[i];
			if (route.type === 'route') {
				latestRoute = route;
				break;
			}
		}

		if (latestRoute) {
			const latestRouteKey = latestRoute?.key; // we get the key of the latest route key which is a generated string

			// we now want to get the descriptor of the latest route
			const descriptors = props.descriptors; // The descriptors hold the screen information for the drawer which might be active
			const latestRouteDescriptor = descriptors[latestRouteKey]; // so we have the information about the descriptor of the latest route
			const latestRouteDescriptorRouteObject: RouteProp<ParamListBase> = latestRouteDescriptor?.route; // we get the route object of the descriptor
			const latestRouteNameWithUnresolvedParams = latestRouteDescriptorRouteObject?.name; // we get the name of the route
			// latestRouteParams is a dict with a string key and a string value
			const latestRouteParams: { [key: string]: string } | undefined = latestRouteDescriptorRouteObject?.params as {
                [key: string]: string
            } | undefined; // we get the params of the route
			// now we want to resolve the params of the route
			let latestRouteName = latestRouteNameWithUnresolvedParams; // we will use the unresolved route name as the default
			if (latestRouteParams) {
				// latestRouteName is maybe /wikis/[id] and we want to resolve the id
				const paramsKeys = Object.keys(latestRouteParams);
				for (let i = 0; i < paramsKeys.length; i++) {
					const key = paramsKeys[i];
					const value = latestRouteParams[key];
					latestRouteName = latestRouteName.replace('[' + key + ']', value);
				}
			}


			// if the internalPath is the same as the latestRouteDescriptorPath, we will set the customItem.isFocused to true
			if (internalPath === latestRouteName) {
				customItem.isFocused = true;
			}
		}
	}
	return customItem;
}

const filterForVisibleInDrawerBottom = (customDrawerItems: MyDrawerCustomItemProps[]) => {
	return customDrawerItems.filter((item) => {
		// if item.visibleInDrawer is true then we will show the item in the drawer
		return item.visibleInBottomDrawer === true;
	});
}

const sortCustomDrawerItems = (customDrawerItems: MyDrawerCustomItemProps[]) => {
	return customDrawerItems.sort((a, b) => {
		// Assuming items without a position should be placed at the end
		const positionA = a.position !== undefined ? a.position : Number.MAX_VALUE;
		const positionB = b.position !== undefined ? b.position : Number.MAX_VALUE;
		return positionA - positionB;
	});
}

export const filterAndSortForVisibleInDrawerBottom = (customDrawerItems: MyDrawerCustomItemProps[]) => {
	return sortCustomDrawerItems(filterForVisibleInDrawerBottom(customDrawerItems));
}

export const getMyDrawerItemsBottom = (props: DrawerContentWrapperProps) => {
	const customDrawerItems: MyDrawerCustomItemProps[] = props.customDrawerItems || [];
	const sortedCustomDrawerItems = filterAndSortForVisibleInDrawerBottom(customDrawerItems)
	return getBottomLegalRequiredLinks(sortedCustomDrawerItems);
}

export const getBottomLegalRequiredLinks = (drawerItems: MyDrawerCustomItemProps[]) => {

	const PADDING = 5;

	function renderSpacer(key: string) {
		return (
			<View key={key} style={{flexDirection: 'row', padding: PADDING}}>
				<Text style={{fontSize: 12}}>{' | '}</Text>
			</View>
		)
	}

	const renderedContent = [];
	for (let i = 0; i < drawerItems.length; i++) {
		let customItem = drawerItems[i];
		const last = i === drawerItems.length - 1;
		const first = i === 0;
		if (first) {
			renderedContent.push(renderSpacer('legalRequiredLinksSpacerFirst-'+i));
		}
		renderedContent.push(<MyDrawerCustomItemBottom {...customItem} />);
		if (!last) {
			renderedContent.push(renderSpacer('legalRequiredLinksSpacerLast-'+i));
		}
		if (last) {
			renderedContent.push(renderSpacer('legalRequiredLinksSpacerLast-'+i));
		}
	}

	return (
		<View style={{width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
			{renderedContent}
		</View>
	);

}

type DrawerContentWrapperProps = {
    customDrawerItems?: MyDrawerCustomItemProps[]
} & DrawerContentComponentProps
export const getMyDrawerItemsCenter = (props: DrawerContentWrapperProps) => {
	const generatedDrawerItems = props.state.routes.map((route: any, index: number) => {
		return getMyDrawerItemExpoGenerated(route, index, props);
	})

	const customDrawerItems: MyDrawerCustomItemProps[] = props.customDrawerItems || [];

	const filteredCustomDrawerItems = customDrawerItems.filter((item) => {
		// if item.visibleInDrawer is true then we will show the item in the drawer
		return item.visibleInDrawer !== false;
	});

	// Step 1: Sort customDrawerItems by position
	const sortedCustomDrawerItems = (filteredCustomDrawerItems).sort((a, b) => {
		// Assuming items without a position should be placed at the end
		const positionA = a.position !== undefined ? a.position : Number.MAX_VALUE;
		const positionB = b.position !== undefined ? b.position : Number.MAX_VALUE;
		return positionA - positionB;
	});
	// Add the customDrawerItem infront of the position of the renderedDrawerItems item

	// Step 2: Merge sortedCustomDrawerItems with renderedDrawerItems
	const finalDrawerItems = [];
	let customItemIndex = 0; // To keep track of our position in the sortedCustomDrawerItems

	generatedDrawerItems.forEach((item, index) => {
		// Add any customDrawerItems that should be placed before the current item
		while (customItemIndex < sortedCustomDrawerItems.length && sortedCustomDrawerItems[customItemIndex].position === index) {
			let customItem = sortedCustomDrawerItems[customItemIndex];
			customItem = configureCustomDrawerItemActiveIfInternalRouteIsUsed(customItem, props);
			finalDrawerItems.push(getMyDrawerCustomItemCenter(customItem)); // Assuming renderCustomDrawerItem is a function that returns a DrawerItem for a customDrawerItem
			customItemIndex++;
		}
		finalDrawerItems.push(item);
	});

	// Add any remaining customDrawerItems at the end
	while (customItemIndex < sortedCustomDrawerItems.length) {
		let customItem = sortedCustomDrawerItems[customItemIndex];
		customItem = configureCustomDrawerItemActiveIfInternalRouteIsUsed(customItem, props);
		finalDrawerItems.push(getMyDrawerCustomItemCenter(customItem));
		customItemIndex++;
	}

	const renderedDrawerItemsWithSeparator = finalDrawerItems.map((item: any, index: number) => {
		return (
			<View key={index}>
				{item}
			</View>
		)
	}   )

	return (
		renderedDrawerItemsWithSeparator
	);
}