import React, {FunctionComponent} from 'react';
import {
	useProjectDescription,
	useProjectName,
} from '@/states/ProjectInfo';
import {Text, View} from '@/components/Themed';

interface AppState {

}
export const ProjectName: FunctionComponent<AppState> = (props) => {
	const project_name = useProjectName();
	const project_descriptor = useProjectDescription();

	function renderVersion() {
		return (
			<View style={{marginTop: 0, marginLeft: 0, justifyContent: 'center'}}>
				<Text size={'sm'} >
					{project_descriptor}
				</Text>
			</View>
		)
	}

	return (
		<View style={{marginTop: 0, marginLeft: 8, justifyContent: 'center'}}>
			<View style={{marginTop: 0, marginLeft: 0, justifyContent: 'center'}}>
				<Text size={'2xl'} bold={true} >
					{project_name}
				</Text>
			</View>
			{renderVersion()}
		</View>
	)
}
