import React from 'react';
import {MyModalActionSheet} from "@/components/modal/MyModalActionSheet";
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";

export const MyModalActionSheetGlobal = () => {
	const [modalConfig, setModalConfig] = useModalGlobalContext();

	const visible = !!modalConfig
	const setVisible = (visible: boolean) => {
		if(!visible){
			setModalConfig(null);
		}
	}

	if(!modalConfig){
		return null;
	}

	return <MyModalActionSheet visible={visible} setVisible={setVisible} item={modalConfig} />

}
