import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {AppConfiguration} from "@/constants/AppConfiguration";

export function useAnimationsAutoPlayDisabledRaw(): [boolean | null | undefined, (value: (boolean | ((currentValue: boolean) => boolean))) => void] {
	const [resource, setResource] = useSyncState<boolean, boolean>(PersistentStore.animations_auto_play_disabled)
	return [resource, setResource]
}

export function useIsAnimationAutoPlayDisabled(): boolean {
	const [resource, setResource] = useAnimationsAutoPlayDisabledRaw()
	const defaultValue = AppConfiguration.DEFAULT_ANIMATIONS_AUTO_PLAY_DISABLED
	const resourceNullOrUndefined = resource === null || resource === undefined
	let usedValue = resourceNullOrUndefined ? defaultValue : resource
	return !!usedValue
}