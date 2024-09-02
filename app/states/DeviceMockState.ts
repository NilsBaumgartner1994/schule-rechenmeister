import {useGlobalSearchParams} from "expo-router";

export type DeviceMockType = undefined | 'none' | 'iphone' | 'android'

class DeviceMockSessionCache {
	public static DEVICE_MOCK_TYPE: DeviceMockType | undefined = undefined
}

export function useDeviceMockTypeState(): DeviceMockType {
	const globalSearchParams = useGlobalSearchParams()
	const valueRaw = globalSearchParams?.deviceMock

	// check is valueRaw is a string or an array
	if (typeof valueRaw === 'string') {
		if (valueRaw === 'none' || valueRaw === 'iphone' || valueRaw === 'android') {
			// set the value to the session cache
			DeviceMockSessionCache.DEVICE_MOCK_TYPE = valueRaw
		}
	}

	// return the value from the session cache
	return DeviceMockSessionCache.DEVICE_MOCK_TYPE
}