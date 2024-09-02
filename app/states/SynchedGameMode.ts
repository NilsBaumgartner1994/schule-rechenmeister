import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';

export enum GameMode {
	FLASHCARDS = 'flashcards',
	PLAYERS = 'players',
}

export function useGameMode(): [GameMode, (callback: (GameMode | ((currentValue: GameMode) => GameMode))) => void] {
	let [demoRaw, setDemoRaw] = useSyncState<GameMode, GameMode>(PersistentStore.game_mode)
	if(demoRaw === null || demoRaw === undefined) {
		demoRaw = GameMode.FLASHCARDS
	}
	return [demoRaw, setDemoRaw]
}