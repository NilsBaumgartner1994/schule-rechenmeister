export class PersistentStore {
	// the key is just for easier access, the value is the actual key in the storage or syncState
	static test = 'PersistentStore.test'

	static debug = 'PersistentStore.debug'
	static demo = 'PersistentStore.demo'
	static animations_auto_play_disabled = 'PersistentStore.performance'
	static develop = 'PersistentStore.develop'
	static game_mode = 'PersistentStore.game_mode'

	static debugAutoLogin = 'PersistentStore.debugAutoLogin'

	static drawerConfig = 'PersistentStore.drawerConfig'

	static colorSchemeName = 'PersistentStore.colorSchemeName'
	static cachedUser = 'PersistentStore.user'

	static server_info = 'PersistentStore.server_info'

	static languages = 'PersistentStore.languages'
	static imageOverlays = 'PersistentStore.image_overlays'
	static wikis = 'PersistentStore.wikis'
	static app_settings = 'PersistentStore.app_settings'
	static roles = 'PersistentStore.roles'

	static sortConfigFoodoffers = 'PersistentStore.sortConfigFoodoffers'
	static sortConfigBuildings = 'PersistentStore.sortConfigBuildings'
	static sortConfigApartments = 'PersistentStore.sortConfigApartments'
	static sortConfigNews = 'PersistentStore.sortConfigNews'
}

type ValueOf<T> = T[keyof T];
export type PersistentStoreValues = ValueOf<typeof PersistentStore>;