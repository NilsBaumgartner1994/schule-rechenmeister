export class NonPersistentStore {
	// the key is just for easier access, the value is the actual key in the storage or syncState
	static test = 'NonPersistentStore.test'

	static currentUser = 'NonPersistentStore.currentUser'

	static textDimensions = 'NonPersistentStore.textDimensions'
	static iconDimensions = 'NonPersistentStore.iconDimensions'

	static foodOfferSelectedDate = 'NonPersistentStore.foodOfferSelectedDate'

	static foodOfferCache = 'NonPersistentStore.foodOfferCache'
}

type ValueOf<T> = T[keyof T];
export type NonPersistentStoreValues = ValueOf<typeof NonPersistentStore>;
