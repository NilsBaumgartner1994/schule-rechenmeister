import {Devices} from '@/helper/database/databaseTypes/types';
import {useSynchedProfile} from '@/states/SynchedProfile';
import {getDeviceInformationWithoutPushToken} from '@/helper/device/DeviceHelper';
import {NotificationHelper} from "@/helper/notification/NotificationHelper";
import {MyCacheHelperType} from "@/helper/cache/MyCacheHelper";



export function useSynchedDevices(): [Devices | undefined , Devices[], (newDevices: Devices[], sync_cache_composed_key_local?: string) => Promise<void>, cacheHelperObj: MyCacheHelperType] {
	const [profile, setProfile, cacheHelperTypeProfile] = useSynchedProfile();

	const sync_cache_composed_key_local = cacheHelperTypeProfile.sync_cache_composed_key_local;

	function getDeviceIdentifier(device: Partial<Devices>) {
		return device.platform+'_'+device.brand+'_'+device.system_version;
	}

	const devices = profile?.devices || [];
	let deviceInformationsWithoutPushToken: Partial<Devices> = getDeviceInformationWithoutPushToken();
	let deviceInformationsId = getDeviceIdentifier(deviceInformationsWithoutPushToken);
	let currentDevice = getCurrentDevice(deviceInformationsId);

	function getCurrentDevice(deviceInformationsId: string | undefined): Devices | undefined {
		let foundDevice: undefined | Devices = undefined;
		if (deviceInformationsId) {
			for (const device of devices) {
				if (getDeviceIdentifier(device) === deviceInformationsId) {
					foundDevice = device;
					break;
				}
			}
		}
		return foundDevice;
	}


	const setDevices = async (newDevices: Devices[], sync_cache_composed_key_local?: string) => {
		await setProfile((currentProfile) => {
			if(currentProfile){
				currentProfile.devices = newDevices;
			}
			return currentProfile;
		}, sync_cache_composed_key_local);
	}

	const updateDeviceInformationAndRegisterIfNotFound = async (sync_cache_composed_key_local?: string) => {
		deviceInformationsWithoutPushToken = getDeviceInformationWithoutPushToken();
		deviceInformationsId = getDeviceIdentifier(deviceInformationsWithoutPushToken);
		const pushTokenObj = await NotificationHelper.loadDeviceNotificationPermission();
		let deviceInformationsWithPushToken = {...deviceInformationsWithoutPushToken,
			pushTokenObj: pushTokenObj
		};


		let newDevices = devices;
		let foundDevice = getCurrentDevice(deviceInformationsId);
		if (!foundDevice) {
			newDevices = [...devices, deviceInformationsWithPushToken];
		} else {
			const deviceInformationsForUpdate = {...foundDevice, ...deviceInformationsWithPushToken}; // we want to keep id or createdAt
			const index = devices.indexOf(foundDevice);
			newDevices = [...devices];
			newDevices[index] = deviceInformationsForUpdate;
		}
		await setDevices(newDevices, sync_cache_composed_key_local);
	}

	const cacheHelperObj: MyCacheHelperType = {
		sync_cache_composed_key_local: sync_cache_composed_key_local,
		updateFromServer: updateDeviceInformationAndRegisterIfNotFound,
		dependencies: {
			collections: [],
			update_always: true
		}

	}

	return [currentDevice, devices, setDevices, cacheHelperObj];
}