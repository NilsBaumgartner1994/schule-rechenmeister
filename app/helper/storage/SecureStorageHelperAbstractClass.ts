// TODO: Rename to SecureStorageHelper and Rename the other SecureStorageHelper to something with platform Specific or so.
import {PersistentSecureStore} from '@/helper/syncState/PersistentSecureStore';

export abstract class SecureStorageHelperAbstractClass {
	static all_keys: Record<string, boolean> = {};

    /**
     * Initializes the storage if necessary.
     */
    abstract init(): Promise<void>;

    static async init(): Promise<void> {
    	await SecureStorageHelperAbstractClass.getInstance().init();
    	const allKeysFromDisk = await SecureStorageHelperAbstractClass.getAllKeysDictFromDisk();
    	SecureStorageHelperAbstractClass.all_keys = allKeysFromDisk;
    }

    static instance: SecureStorageHelperAbstractClass | null = null;

    static setInstance(instance: SecureStorageHelperAbstractClass) {
    	SecureStorageHelperAbstractClass.instance = instance;
    }

    static getInstance(): SecureStorageHelperAbstractClass {
    	if (!SecureStorageHelperAbstractClass.instance) {
    		throw new Error('Initialize SecureStorageHelperAbstractClass first.');
    	}
    	return SecureStorageHelperAbstractClass.instance;
    }

    /**
     * Sets a value in the storage. Null for value deletes the entry.
     * @param key
     * @param value
     */
    static async setItem(key: string, value: string | null): Promise<boolean> {
    	//console.log("StorageHelper.setItem", key, value)
    	if (value===null) {
    		delete SecureStorageHelperAbstractClass.all_keys[key]
    		await SecureStorageHelperAbstractClass.updateAllKeys(SecureStorageHelperAbstractClass.all_keys);
    		return await SecureStorageHelperAbstractClass.getInstance().removeItemRaw(key);
    	} else {
    		SecureStorageHelperAbstractClass.all_keys[key] = true;
    		await SecureStorageHelperAbstractClass.updateAllKeys(SecureStorageHelperAbstractClass.all_keys);
    		return await SecureStorageHelperAbstractClass.getInstance().setItemRaw(key, value);
    	}
    }

    /**
     * Gets a value from the storage.
     * @param key
     */
    static async getItem(key: string): Promise<string | undefined> {
    	try {
    		let value: string | undefined | null = undefined
    		const valueFromSecureLocalStorage = await SecureStorageHelperAbstractClass.getInstance().getItemRaw(key);
    		if (typeof valueFromSecureLocalStorage === 'string') {
    			value = valueFromSecureLocalStorage;
    		}
    		if (value !== null) {
    			return value;
    		}
    		return undefined;
    	} catch (error) {
    		console.error(error);
    	}
    	return undefined;
    }

    private static async updateAllKeys(all_keys: Record<string, boolean>) {
    	SecureStorageHelperAbstractClass.all_keys = all_keys;
    	await SecureStorageHelperAbstractClass.getInstance().setItemRaw(PersistentSecureStore.ALL_KEYS, JSON.stringify(all_keys));
    }

    private static async getAllKeysDictFromDisk(): Promise<Record<string, boolean>> {
    	const valueAsString = await SecureStorageHelperAbstractClass.getItem(PersistentSecureStore.ALL_KEYS);
    	const dict = valueAsString ? JSON.parse(valueAsString) : {};
    	return dict;
    }

    static async clear() {
    	const allKeys = SecureStorageHelperAbstractClass.getAllKeys();
    	for (let i=0; i<allKeys.length; i++) {
    		const key = allKeys[i];
    		await SecureStorageHelperAbstractClass.setItem(key, null);
    	}
    	//await SecureStorageHelperAbstractClass.setItem(PersistentSecureStore.ALL_KEYS, null);
    }

    private static getAllKeys(): string[] {
    	return Object.keys(SecureStorageHelperAbstractClass.all_keys);
    }

    abstract getItemRaw(key: string): Promise<string | undefined | null>

    abstract removeItemRaw(key: string): Promise<boolean>;

    abstract setItemRaw(key: string, value: string): Promise<boolean>;
}