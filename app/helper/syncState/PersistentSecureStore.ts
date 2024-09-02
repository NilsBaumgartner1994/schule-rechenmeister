export class PersistentSecureStore {
	static ALL_KEYS = 'PersistentSecureStore.ALL_KEYS';

	// the key is just for easier access, the value is the actual key in the storage or syncState
	static authentificationData = 'PersistentSecureStore.authentificationData';
}

type ValueOf<T> = T[keyof T];
export type PersistentSecureStoreValues = ValueOf<typeof PersistentSecureStore>;