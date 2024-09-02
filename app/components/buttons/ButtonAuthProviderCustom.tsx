import React from 'react';
import {MyButton} from '@/components/buttons/MyButton';

// Define the type for Single Sign-On (SSO) providers
type ButtonAuthProviderCustomProps = {
    onPress?: (() => void | Promise<void>) | undefined,
    accessibilityLabel: string,
    text: string,
    icon_name: string,
    disabled?: boolean
}

// The component to handle SSO login links
export const ButtonAuthProviderCustom = ({ text, accessibilityLabel, onPress, icon_name, disabled }: ButtonAuthProviderCustomProps) => {
	/**
     <MyButton text={text} onPress={onPress} disabled={disabled} accessibilityLabel={accessibilityLabel} leftIconName={icon_name} leftIconFamily={icon_family}>
     </MyButton>
     */

	return (
		<MyButton text={text}
			onPress={onPress}
			disabled={disabled}
			accessibilityLabel={accessibilityLabel}
			leftIcon={icon_name}
			leftIconColoredBox={true}
		/>
	)
};