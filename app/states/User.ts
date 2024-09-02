import {SyncState, useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {NonPersistentStore} from '@/helper/syncState/NonPersistentStore';
import {AuthenticationData} from '@directus/sdk';
import {PersistentSecureStore} from '@/helper/syncState/PersistentSecureStore';
import {DirectusRoles, DirectusUsers} from '@/helper/database/databaseTypes/types';
import {useSynchedRolesDict} from "@/states/SynchedRoles";

export type CachedUserInformation = {
    data: DirectusUsers | undefined,
    loggedIn: boolean
}

export function useLogoutCallback(): () => void {
	return async () => {
		await SyncState.getInstance().reset();
	}
}

export function useAccessToken(): string | null | undefined {
	const [authData, setAuthData] = useSyncState<AuthenticationData>(PersistentSecureStore.authentificationData)
	return authData?.access_token
}

export function useCachedUserRaw(): [CachedUserInformation | null | undefined, (callback: (currentValue: (CachedUserInformation | null | undefined)) => (CachedUserInformation | null | undefined)) => void] {
	const [cachedUserRaw, setCachedUser] = useSyncState<CachedUserInformation>(PersistentStore.cachedUser)
	return [cachedUserRaw, setCachedUser]
}

export function useCurrentUserRaw(): [CachedUserInformation | null | undefined, (newValue: CachedUserInformation) => void] {
	const [cachedUser, setCachedUser] = useCachedUserRaw()
	const [currentUser, setCurrentUser] = useSyncState<CachedUserInformation>(NonPersistentStore.currentUser)
	// TODO: Update cached user
	const setUserWithCache = (newValue: any) => {
		setCurrentUser((currentValue) => {
			return newValue
		})
		setCachedUser((currentValue) => {
			return newValue
		})
	}

	return [currentUser, setUserWithCache]
}

function isDirectusUserAnonymous(user: DirectusUsers | undefined) {
	if (!user) return true
	return user?.id === undefined || user?.id === null
}

/**
 * Used in the RootAuthUser Flow Loader where we want to check the cache
 * @param user
 */
export function getIsCachedUserAnonymous(user: CachedUserInformation | undefined | null): boolean {
	return isDirectusUserAnonymous(user?.data);
}

export function useIsCurrentUserAnonymous() {
	const [currentUser, setCurrentUser] = useCurrentUser();
	return isDirectusUserAnonymous(currentUser);
}

export function getAnonymousUser(): any {
	return {
		// TODO: Add some default values
		id: null,
	}
}

export function useCurrentUser(): [DirectusUsers | undefined, (newValue: any) => void] {
	const [currentUserRaw, setCurrentUserRaw] = useCurrentUserRaw()
	// TODO: Update cached user
	const setUserWithCache = (newValue: any) => {
		setCurrentUserRaw(
			{
				data: newValue,
				loggedIn: !!newValue
			}
		)
	}
	const currentUser = currentUserRaw?.data

	return [currentUser, setUserWithCache]
}

export function useCurrentRole(): DirectusRoles | null {
	const [currentUser, setCurrentUser] = useCurrentUser()
	const [rolesDict, setRolesDict] = useSynchedRolesDict()
	const role_id = currentUser?.role
	if(!role_id){
		return null
	}
	if(typeof role_id !== 'string'){
		return role_id
	}
	const role = rolesDict?.[role_id]
	return role || null
}

export function useCurrentRoleIsAdmin(): boolean | null{
	const role = useCurrentRole();
	if(role?.admin_access){
		return true;
	}
	// TODO: check if other roles are required
	return false;
}

export function useCurrentRoleIsAtleastManagement(){
	return false;
}

export function isUserLoggedIn(): boolean {
	const [currentUserRaw, setCurrentUserRaw] = useCurrentUserRaw()
	return !!currentUserRaw?.loggedIn
}