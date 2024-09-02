import {getMyScreenHeaderFunction, MyScreenHeader, MyScreenHeaderProps} from "@/components/drawer/MyScreenHeader";
import {IconNames} from "@/constants/IconNames";

const MyCustomHeaderNavigateHome = ({ ...props }: MyScreenHeaderProps) => {
	return <MyScreenHeader {...props} navigateHome={true} navigateHomeIcon={IconNames.close_icon} navigateHomeText={"Beenden"}  />
}

export const getMyCustomHeaderNavigateHome: getMyScreenHeaderFunction = () => {
	return (props: MyScreenHeaderProps) => {
		return <MyCustomHeaderNavigateHome {...props} />
	}
}
