import {useBreakPointValue} from '@/helper/device/DeviceHelper';

export function useMyGridListDefaultColumns(): number {
	return useBreakPointValue({sm: 2, md: 3, lg: 4, xl: 5});
}