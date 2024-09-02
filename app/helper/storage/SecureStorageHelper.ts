
// Installation
// https://docs.expo.dev/versions/latest/sdk/securestore/#installation

// Usage
// https://docs.expo.dev/versions/latest/sdk/securestore/#usage

import * as SecureStore from 'expo-secure-store';
import {SecureStorageHelperAbstractClass,} from '@/helper/storage/SecureStorageHelperAbstractClass';
import {Promise} from 'ts-toolbelt/out/Any/Promise';

export class SecureStorageHelper extends SecureStorageHelperAbstractClass {
	async init(): Promise<void> {
		// nothing to do
	}

	async removeItemRaw(key: string): Promise<boolean> {
		try {
			await SecureStore.deleteItemAsync(key);
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	async setItemRaw(key: string, value: string): Promise<boolean> {
		try {
			await SecureStore.setItemAsync(key, value);
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	async getItemRaw(key: string): Promise<string | undefined | null> {
		const value = await SecureStore.getItemAsync(key);
		return value;
	}
}