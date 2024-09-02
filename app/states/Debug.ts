import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {useGlobalSearchParams} from "expo-router";

export function useDebugRaw(): [boolean | null, (newValue: boolean) => void] {
	const [debug, setDebug] = useSyncState<boolean>(PersistentStore.debug)
	return [debug, setDebug]
}

export function useIsDebug(): boolean {
	const [debug] = useDebugRaw()
	return !!debug
}

export function useDebug(): [boolean, (newValue: boolean) => void] {
	const [debugRaw, setDebugRaw] = useDebugRaw()
	const globalSearchParams = useGlobalSearchParams()
	const debugParamRaw = globalSearchParams?.debug
	const debugParam = debugParamRaw === "true"

	const debug = debugRaw ?? debugParam
	return [!!debug, setDebugRaw]
}