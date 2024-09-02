import {useSyncStateSetter, useSyncStateValue} from '@/helper/syncState/SyncState';
import {useCallback} from "react";

export type NewValueRawSingleType<Scheme> = {
  data: Scheme | null | undefined,
  sync_cache_composed_key_local: string | undefined
}

export function useSynchedResourceSingleRaw<Resource>(storeKey: string): [(Resource | null | undefined), ((newValue: ((currentValue: Resource | null | undefined) => Resource | null | undefined), cache_key?: string) => void), NewValueRawSingleType<Resource> | null | undefined, (callback: (currentValue: NewValueRawSingleType<Resource> | null | undefined) => NewValueRawSingleType<Resource> | null | undefined) => void] {
	const resourcesRaw = useSynchedResourceSingleRawValue<Resource, NewValueRawSingleType<Resource>>(storeKey);
	const [setResourcesOnly, setResourcesRaw] = useSynchResourceSingleRawSetter<Resource>(storeKey);

	const resourcesOnly = resourcesRaw?.data
	return [resourcesOnly, setResourcesOnly, resourcesRaw, setResourcesRaw]
}

export function useSynchResourceSingleRawSetter<Resource>(storeKey: string): [(newValue: ((currentValue: Resource | null | undefined) => Resource | null | undefined), sync_cache_composed_key_local?: string) => void, (callback: (currentValue: NewValueRawSingleType<Resource> | null | undefined) => NewValueRawSingleType<Resource> | null | undefined) => void] {
	const setResourcesRaw = useSyncStateSetter(storeKey);
	const setResourcesOnly = useCallback(
		(callback: ((currentValue: Resource | null | undefined) => Resource | null | undefined), sync_cache_composed_key_local?: string) => {
			setResourcesRaw((currentValue: NewValueRawSingleType<Resource> | null | undefined) => {
				let currentValueData = currentValue?.data;
				let currentSyncCacheComposedKey = sync_cache_composed_key_local || currentValue?.sync_cache_composed_key_local;
				console.log("useSynchResourceSingleRawSetter currentSyncCacheComposedKey", currentSyncCacheComposedKey)
				console.log("sync_cache_composed_key_local", sync_cache_composed_key_local)
				console.log("currentValue?.sync_cache_composed_key_local", currentValue?.sync_cache_composed_key_local)
				console.log("-------------------")
				const newValue = callback(currentValueData);
				let returnValue: NewValueRawSingleType<Resource> = {
					data: newValue,
					sync_cache_composed_key_local: currentSyncCacheComposedKey
				};
				return returnValue;
			});
		},
		// Dependencies for useCallback
		[setResourcesRaw]
	);

	return [setResourcesOnly, setResourcesRaw]
}

export function useSynchedResourceSingleRawValue<Resource, K>(storeKey: string, selectorMethod?: (value: NewValueRawSingleType<Resource> |null | undefined) => K |null | undefined): K | null | undefined {
	return useSyncStateValue<NewValueRawSingleType<Resource>, K>(storeKey, selectorMethod)
}

export function useSynchedResourcesDictRaw<Resource>(storeKey: string): [(Record<string, Resource | null |undefined> | null | undefined), (callback: (currentValue: Record<string, Resource | null |undefined> | null | undefined) => Record<string, Resource | null |undefined>, sync_cache_composed_key_local?: string) => void, NewValueRawSingleType<Record<string, Resource | null |undefined>> | null | undefined, (value: (currentValue: NewValueRawSingleType<Record<string, Resource | null |undefined>> | null | undefined) => NewValueRawSingleType<Record<string, Resource | null |undefined>>) => void] {
	const [resourceDictOnly, setResourceDictOnly, resourceDictRaw, setResourceDictRaw] = useSynchedResourceSingleRaw<Record<string, Resource | null |undefined>>(storeKey)
	return [resourceDictOnly, setResourceDictOnly, resourceDictRaw, setResourceDictRaw]
}