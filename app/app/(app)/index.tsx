import {router, useFocusEffect} from 'expo-router';
import {MySafeAreaView} from '@/components/MySafeAreaView';
import {MyScrollView} from '@/components/scrollview/MyScrollView';
import {View} from '@/components/Themed';

export default function TabOneScreen() {
	useFocusEffect(() => {
		// Call the replace method to redirect to a new route without adding to the history.
		// We do this in a useFocusEffect to ensure the redirect happens every time the screen
		// is focused.
		router.push('/home/')
	});

	return (
		<MySafeAreaView>
			<MyScrollView>
				<View >

				</View>
			</MyScrollView>
		</MySafeAreaView>
	)
}