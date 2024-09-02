
// Installation
// https://docs.expo.dev/versions/latest/sdk/securestore/#installation

// Usage
// https://docs.expo.dev/versions/latest/sdk/securestore/#usage

//import * as SecureStore from 'expo-secure-store'; // Not available in web
import secureLocalStorage from 'react-secure-storage'; // WARNING: This does not work in react-native context
import {SecureStorageHelperAbstractClass,} from '@/helper/storage/SecureStorageHelperAbstractClass';

export class SecureStorageHelper extends SecureStorageHelperAbstractClass {
	async init(): Promise<void> {
		// nothing to do
	}

	async removeItemRaw(key: string): Promise<boolean> {
		try {
			await secureLocalStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	async setItemRaw(key: string, value: string): Promise<boolean> {
		try {
			await secureLocalStorage.setItem(key, value)
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	async getItemRaw(key: string): Promise<string | undefined | null> {
		let value: string | undefined | null = undefined
		const valueFromSecureLocalStorage = secureLocalStorage.getItem(key);
		if (typeof valueFromSecureLocalStorage === 'string') {
			value = valueFromSecureLocalStorage;
		}
		if (value !== null) {
			return value;
		}
	}
}