import {getMyScreenHeaderFunction, MyScreenHeader, MyScreenHeaderProps} from "@/components/drawer/MyScreenHeader";
import {IconNames} from "@/constants/IconNames";
import {useCurrentPlayers} from "@/states/SynchedProfile";
import {navigateToPlayerStats} from "@/app/(app)/playerStats";
import {navigateToHome} from "@/app/(app)/home";

const MyCustomHeaderNavigateHome = ({ ...props }: MyScreenHeaderProps) => {
	const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();
	let amountPlayers = Object.keys(players).length;
	const navigateToRoute = amountPlayers > 0 ? navigateToPlayerStats : navigateToHome

	return <MyScreenHeader {...props} onPress={navigateToRoute} navigateHomeIcon={IconNames.close_icon} navigateHomeText={"Beenden"}  />
}

export const getMyCustomHeaderNavigateHome: getMyScreenHeaderFunction = () => {
	return (props: MyScreenHeaderProps) => {
		return <MyCustomHeaderNavigateHome {...props} />
	}
}
