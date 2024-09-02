import {DirectusRoles} from '@/helper/database/databaseTypes/types';
import {useSynchedResourcesDictRaw} from '@/states/SynchedResource';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {useIsDemo} from '@/states/SynchedDemo';

export function useSynchedRolesDict(): [ Record<string, DirectusRoles | null | undefined> | null | undefined, ( (callback: (currentValue: (Record<string, DirectusRoles | null | undefined> | null | undefined)) => Record<string, DirectusRoles | null | undefined>, sync_cache_composed_key_local?: string) => void)]
{
	const [resourcesOnly, setResourcesOnly, resourcesRaw, setResourcesRaw] = useSynchedResourcesDictRaw<DirectusRoles>(PersistentStore.roles);
	const demo = useIsDemo()
	const sync_cache_composed_key_local = resourcesRaw?.sync_cache_composed_key_local;
	const usedResources = resourcesOnly;
	if (demo) {
		//usedResources = getDemoBuildings()
	}

	return [usedResources, setResourcesOnly]
}