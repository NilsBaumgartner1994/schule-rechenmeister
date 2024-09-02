import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {useGlobalSearchParams} from "expo-router";

export function useDemoRaw(): [boolean | null | undefined, (callback: (currentValue: (boolean | null | undefined)) => (boolean | null | undefined)) => void] {
	const [demoRaw, setDemoRaw] = useSyncState<boolean, boolean>(PersistentStore.demo)
	return [demoRaw, setDemoRaw]
}

export function useIsDemo(): boolean {
	const [demoRaw, setDemoRaw] = useDemoRaw()
	const globalSearchParams = useGlobalSearchParams()
	const demoParamRaw = globalSearchParams?.demo
	const demoParam = demoParamRaw === "true"

	const demo = demoRaw ?? demoParam
	return !!demo
}