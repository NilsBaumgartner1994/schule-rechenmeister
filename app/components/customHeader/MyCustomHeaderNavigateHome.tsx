import {getMyScreenHeaderFunction, MyScreenHeader, MyScreenHeaderProps} from "@/components/drawer/MyScreenHeader";
import {IconNames} from "@/constants/IconNames";

const MyCustomHeaderNavigateHome = ({ ...props }: MyScreenHeaderProps) => {
	return <MyScreenHeader {...props} navigateHome={true} navigateHomeIcon={IconNames.logout_icon} />
}

export const getMyCustomHeaderNavigateHome: getMyScreenHeaderFunction = () => {
	return (props: MyScreenHeaderProps) => {
		return <MyCustomHeaderNavigateHome {...props} />
	}
}
