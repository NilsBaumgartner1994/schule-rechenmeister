import React from 'react';
import {isFinite} from 'lodash';
import {isArray} from 'lodash';
import {isString} from 'lodash';
import {isNaN} from 'lodash';
import {View} from "react-native";

//https://www.npmjs.com/package/react-rectangle/v/1.2.0
export default ({ aspectRatio = 1, children, style, percentMoveTop, ...rest }) => {
    const multiplier = calculateAspectRatio(aspectRatio);

    const usePercentMoveTop = percentMoveTop || 0;
    const usePercentMoveTopStyle = usePercentMoveTop ? usePercentMoveTop * multiplier + '%' : 0;

    return (
        <View style={{ position: 'relative', ...style }} {...rest}>
            <View style={{ display: 'flex', paddingTop: 100 * multiplier + '%' }} />
            <View style={{ position: 'absolute', bottom: 0, left: 0, top: usePercentMoveTopStyle, right: 0 }}>{children}</View>
        </View>
    );
};

const calculateAspectRatio = aspectRatio => {
    if (isFinite(aspectRatio)) {
        return 1 / aspectRatio;
    } else if (isArray(aspectRatio) && aspectRatio[0] !== undefined && aspectRatio[1] !== undefined) {
        return aspectRatio[1] / aspectRatio[0];
    } else if (aspectRatio.width !== undefined && aspectRatio.height !== undefined) {
        return aspectRatio.height / aspectRatio.width;
    } else if (isString(aspectRatio)) {
        const parsedValue = Number.parseFloat(aspectRatio);
        if (isNaN(parsedValue)) {
            throw new Error('Cannot parse input string: ' + aspectRatio);
        }
        return 1 / Number.parseFloat(aspectRatio);
    }

    throw new Error('Cannot parse props.aspectRatio: ' + aspectRatio);
};

export { calculateAspectRatio };
