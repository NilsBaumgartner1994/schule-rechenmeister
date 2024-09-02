import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';

export function useIsDeveloperModeActive(): boolean {
	const [debug, setDebug] = useDeveloperModeRaw();
	return !!debug
}

export function useDeveloperModeRaw(): [boolean | null | undefined, (callback: (currentValue: (boolean | null | undefined)) => (boolean | null | undefined)) => void] {
	const [demoRaw, setDemoRaw] = useSyncState<boolean, boolean>(PersistentStore.develop)
	return [demoRaw, setDemoRaw]
}