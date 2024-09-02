
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {useIsDemo} from '@/states/SynchedDemo';
import {useSynchedResourceSingleRaw} from '@/states/SynchedResource';
import {ServerInfoOutput} from "@directus/sdk";

export function useServerInfoRaw() {
	return useSynchedResourceSingleRaw<ServerInfo>(PersistentStore.server_info);
}

interface ExtendedProperties {
	project: {
		project_descriptor: string | null;
		project_logo: string | null;
		project_color: string | null;
		public_foreground: string | null;
		public_background: string | null;
		public_note: string | null;
		custom_css: string | null;
	};
}

type ExtendedServerInfoOutput = ServerInfoOutput & ExtendedProperties;

export interface ServerInfo{
	// status can be "loading", "online" or "offline"
	status: 'loading' | 'online' | 'offline' | 'error' | 'cached';

	info: ExtendedServerInfoOutput | null;
	errorMessage?: any;
}

export function useServerInfo() {
	const usedServerInfo = {
		status: 'cached',
		info: {
			project: {
				project_name: 'Schule Rechenmeister',
				project_descriptor: '',
				default_language: 'de-DE',
				project_logo: null,
				project_color: '#FFF2CC',
				public_foreground: null,
				public_background: null,
				public_note: null,
				custom_css: null,
			}
		},
	}

	return usedServerInfo;
}

export function useServerStatus() {
	const serverInfo = useServerInfo();
	return serverInfo?.status;
}

export function useIsServerOnline() {
	const status = useServerStatus();
	return status === 'online'
}

export function useIsServerCached() {
	const status = useServerStatus();
	return status === 'cached'
}

export function useIsServerOffline() {
	const status = useServerStatus();
	return status === 'offline' || status === 'error' || status === undefined
}