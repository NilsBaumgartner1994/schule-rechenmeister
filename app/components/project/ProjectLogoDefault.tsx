import React from 'react';
import {useProjectColorContrast} from '@/states/ProjectInfo';
import {Image} from 'expo-image';

// import from asset/logo the default logo RocketMealsLogoWhite
//const logoWhite = require('../../assets/logo/RocketMealsLogoWhite.png');
//const logoBlack = require('../../assets/logo/RocketMealsLogoBlack.png');

const defaultIcon = require('../../assets/images/icon.png');

interface ProjectLogoDefaultProps {
    style?: any;
}
export const ProjectLogoDefault = (props: ProjectLogoDefaultProps) => {
	const projectColorContrast = useProjectColorContrast();
	// projectColorContrast is a string either "#000000" or "#FFFFFF"
	// so when #000000 we want to use the white logo and when #FFFFFF we want to use the black logo
	const useWhiteLogo = projectColorContrast === '#FFFFFF';

    type CachePolicy = 'none' | 'disk' | 'memory' | 'memory-disk'
    const cachePolicy: CachePolicy = 'none'
    /** https://docs.expo.dev/versions/latest/sdk/image/#cachepolicy
     'none' - Image is not cached at all.
     'disk' - Image is queried from the disk cache if exists, otherwise it's downloaded and then stored on the disk.
     'memory' - Image is cached in memory. Might be useful when you render a high-resolution picture many times. Memory cache may be purged very quickly to prevent high memory usage and the risk of out of memory exceptions.
     'memory-disk' - Image is cached in memory, but with a fallback to the disk cache.
     */

    let source = defaultIcon;

    return (
    	<Image
    		source={source}
    		alt={'Logo'}
    		contentFit={'contain'}
    		style={props.style}
    		cachePolicy={cachePolicy}
    	/>
    )
}