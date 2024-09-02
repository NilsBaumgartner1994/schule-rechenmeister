
// Installation
// https://docs.expo.dev/versions/latest/sdk/async-storage/

// Usage
// https://react-native-async-storage.github.io/async-storage/docs/usage/

import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageHelper {
	/**
     * Sets a value in the storage. Null for value deletes the entry.
     * @param key
     * @param value
     */
	static async setItem(key: string, value: string | null): Promise<boolean> {
		if (value===null) {
			return await StorageHelper.removeItemRaw(key);
		} else {
			return await StorageHelper.setItemRaw(key, value);
		}
	}

	static async clear(): Promise<boolean> {
		try {
			await AsyncStorage.clear();
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	private static async removeItemRaw(key: string): Promise<boolean> {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	private static async setItemRaw(key: string, value: string): Promise<boolean> {
		try {
			await AsyncStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	}

	static async getItem(key: string): Promise<string | undefined> {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return value;
			}
			return undefined;
		} catch (error) {
			console.error(error);
		}
		return undefined;
	}

	static async getAllKeys(): Promise<string[] | undefined> {
		try {
			const keys = await AsyncStorage.getAllKeys();
			const keysCopy = [...keys]; // since keys are read-only we make a copy
			return keysCopy;
		} catch (error) {
			console.error(error);
		}
	}
}