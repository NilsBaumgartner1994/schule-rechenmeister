import React from 'react';
import {TranslationKeys, useTranslation} from "@/helper/translations/Translation";
import {IconNames} from "@/constants/IconNames";
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";
import {MyModalActionSheetItem} from "@/components/modal/MyModalActionSheet";


export type MyModalPropsConfirmer = {
	title?: string,
	hideConfirmAndCancelOption?: boolean
	confirmLabel?: string
	cancelLabel?: string
	onConfirm: () => void | Promise<boolean | void> | void,
	onCancel?: () => void | Promise<void> | void,
	renderAsContentPreItems?: (key: string, hide: () => void) => React.ReactNode
}
export const useMyModalConfirmer = (props: MyModalPropsConfirmer) => {
	const translation_confirm = useTranslation(TranslationKeys.confirm);
	const translation_cancel = useTranslation(TranslationKeys.cancel);
	const translation_attention = useTranslation(TranslationKeys.attention);
	const title = props?.title || translation_attention
	const [modalConfig, setModalConfig] = useModalGlobalContext();

	let items: MyModalActionSheetItem[] = []

	const usedConfirmLabel = props.confirmLabel || translation_confirm
	const onCancel = props.onCancel

	if(!props.hideConfirmAndCancelOption){
		items.push({
			key: "MyModalConfirmer",
			label: usedConfirmLabel,
			accessibilityLabel: usedConfirmLabel,
			iconLeft: IconNames.confirm_icon,
			onSelect: async (key: string, hide: () => void) => {
				const result = await props.onConfirm()
				if(result!==false){
					hide()
				}
			}
		})

		items.push({
			key: "cancel",
			label: translation_cancel,
			accessibilityLabel: translation_cancel,
			iconLeft: IconNames.cancel_icon,
			onSelect: async (key: string, hide: () => void) => {
				if(onCancel){
					await onCancel()
					hide()
				}
			}
		})
	}

	return () => {
		setModalConfig({
			title: title,
			accessibilityLabel: title,
			key: "MyModalConfirmer",
			label: title,
			items: items,
			onCancel: onCancel,
			renderAsContentPreItems: (key: string, hide: () => void) => {
				if (props.renderAsContentPreItems) {
					return (
						<>
							{props.renderAsContentPreItems(key, hide)}
						</>
					)
				}
			}
		})
	};
}
