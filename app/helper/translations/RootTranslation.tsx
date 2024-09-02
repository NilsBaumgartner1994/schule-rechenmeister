import {useProfileLanguageCode} from "@/states/SynchedProfile";

export enum RootTranslationKey {
	CHECK_FOR_APP_UPDATES = 'CHECK_FOR_APP_UPDATES',
	DOWNLOAD_NEW_APP_UPDATE = 'DOWNLOAD_NEW_APP_UPDATE',
	SYNC_SERVER_SETTINGS = 'SYNC_SERVER_SETTINGS',
	SYNC_DATABASE = 'SYNC_DATABASE',
	SYNC_USER_SETTINGS = 'SYNC_USER_SETTINGS',
	CHECK_USER_AUTHENTICATION = 'CHECK_USER_AUTHENTICATION',
	CHECK_SERVER_STATUS = 'CHECK_SERVER_STATUS',
	SERVER_IS_OFFLINE = 'SERVER_IS_OFFLINE',
	CONTINUE_WITH_CACHE = 'CONTINUE_WITH_CACHE',
}

type RootTranslationForLanguage = {
	"de": string,
	"en": string,
	"fr": string,
	"it": string,
	"es": string,
	"pt": string,
	"nl": string,
	"pl": string,
	"ru": string,
	"tr": string,
	"zh": string,
	"ja": string,
	"ko": string,
	"ar": string,
}


export function useRootTranslation(key: RootTranslationKey): string {
	const [language, setLanguage] = useProfileLanguageCode()

	const translation: RootTranslationForLanguage = getRootTranslation(key)
	let languageCode = language.toLowerCase()
	// remove from language code if it contains a region code
	if (languageCode.includes("-")) {
		languageCode = languageCode.split("-")[0]
	}
	let useText = translation?.[languageCode] || (language+": "+key)
	return useText
}

function getRootTranslation(key: RootTranslationKey): RootTranslationForLanguage {
	switch (key) {
		case RootTranslationKey.SERVER_IS_OFFLINE: return getRootTranslationServerIsOffline(); break;
		case RootTranslationKey.CONTINUE_WITH_CACHE: return getRootTranslationContinueWithCache(); break;
		case RootTranslationKey.CHECK_FOR_APP_UPDATES: return getCheckForAppUpdatesTranslation(); break;
		case RootTranslationKey.DOWNLOAD_NEW_APP_UPDATE: return getDownloadNewAppUpdateTranslation(); break;
		case RootTranslationKey.CHECK_SERVER_STATUS: return getEstablishConnectionToServerTranslation(); break;
		case RootTranslationKey.CHECK_USER_AUTHENTICATION: return getCheckUserTranslation(); break;
		case RootTranslationKey.SYNC_SERVER_SETTINGS: return getSyncServerSettingsTranslation(); break;
		case RootTranslationKey.SYNC_DATABASE: return getSyncDatabaseTranslation(); break;
		case RootTranslationKey.SYNC_USER_SETTINGS: return getSyncUserSettingsTranslation(); break;

	}
	return getRootTranslationServerIsOffline()
}

function getSyncServerSettingsTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Server-Einstellungen synchronisieren',
		"en": 'Sync server settings',
		"fr": 'Synchroniser les paramètres du serveur',
		"it": 'Sincronizza le impostazioni del server',
		"es": 'Sincronizar ajustes del servidor',
		"pt": 'Sincronizar configurações do servidor',
		"nl": 'Serverinstellingen synchroniseren',
		"pl": 'Synchronizuj ustawienia serwera',
		"ru": 'Синхронизировать настройки сервера',
		"tr": 'Sunucu ayarlarını senkronize et',
		"zh": '同步服务器设置',
		"ja": 'サーバー設定を同期する',
		"ko": '서버 설정 동기화',
		"ar": 'مزامنة إعدادات الخادم'
	}
}

function getSyncDatabaseTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Datenbank synchronisieren',
		"en": 'Sync database',
		"fr": 'Synchroniser la base de données',
		"it": 'Sincronizza il database',
		"es": 'Sincronizar base de datos',
		"pt": 'Sincronizar banco de dados',
		"nl": 'Database synchroniseren',
		"pl": 'Synchronizuj bazę danych',
		"ru": 'Синхронизировать базу данных',
		"tr": 'Veritabanını senkronize et',
		"zh": '同步数据库',
		"ja": 'データベースを同期する',
		"ko": '데이터베이스 동기화',
		"ar": 'مزامنة قاعدة البيانات'
	}
}

function getSyncUserSettingsTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Benutzereinstellungen synchronisieren',
		"en": 'Sync user settings',
		"fr": 'Synchroniser les paramètres utilisateur',
		"it": 'Sincronizza le impostazioni utente',
		"es": 'Sincronizar ajustes de usuario',
		"pt": 'Sincronizar configurações do usuário',
		"nl": 'Gebruikersinstellingen synchroniseren',
		"pl": 'Synchronizuj ustawienia użytkownika',
		"ru": 'Синхронизировать настройки пользователя',
		"tr": 'Kullanıcı ayarlarını senkronize et',
		"zh": '同步用户设置',
		"ja": 'ユーザー設定を同期する',
		"ko": '사용자 설정 동기화',
		"ar": 'مزامنة إعدادات المستخدم'
	}
}

function getCheckUserTranslation(): RootTranslationForLanguage {
	// return de Benutzer überprüfen
	return {
		"de": 'Benutzer überprüfen',
		"en": 'Check user',
		"fr": 'Vérifier l\'utilisateur',
		"it": 'Controlla utente',
		"es": 'Comprobar usuario',
		"pt": 'Verificar usuário',
		"nl": 'Gebruiker controleren',
		"pl": 'Sprawdź użytkownika',
		"ru": 'Проверить пользователя',
		"tr": 'Kullanıcıyı kontrol et',
		"zh": '检查用户',
		"ja": 'ユーザーを確認',
		"ko": '사용자 확인',
		"ar": 'تحقق من المستخدم'
	}
}

function getEstablishConnectionToServerTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Verbindung zum Server herstellen',
		"en": 'Establish connection to server',
		"fr": 'Établir une connexion au serveur',
		"it": 'Stabilire una connessione al server',
		"es": 'Establecer conexión con el servidor',
		"pt": 'Estabelecer conexão com o servidor',
		"nl": 'Verbinding maken met server',
		"pl": 'Ustanowienie połączenia z serwerem',
		"ru": 'Установить соединение с сервером',
		"tr": 'Sunucuya bağlantı kur',
		"zh": '与服务器建立连接',
		"ja": 'サーバーへの接続を確立する',
		"ko": '서버에 연결 설정',
		"ar": 'إنشاء اتصال بالخادم'
	}
}

function getDownloadNewAppUpdateTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Neues App-Update herunterladen',
		"en": 'Download new app update',
		"fr": 'Télécharger la nouvelle mise à jour de l\'application',
		"it": 'Scarica il nuovo aggiornamento dell\'app',
		"es": 'Descargar nueva actualización de la aplicación',
		"pt": 'Baixar nova atualização do aplicativo',
		"nl": 'Nieuwe app-update downloaden',
		"pl": 'Pobierz nową aktualizację aplikacji',
		"ru": 'Загрузить новое обновление приложения',
		"tr": 'Yeni uygulama güncellemesini indir',
		"zh": '下载新的应用程序更新',
		"ja": '新しいアプリの更新をダウンロード',
		"ko": '새로운 앱 업데이트 다운로드',
		"ar": 'تحميل تحديث التطبيق الجديد'
	}
}

function getCheckForAppUpdatesTranslation(): RootTranslationForLanguage {
	return {
		"de": 'Nach App-Updates suchen',
		"en": 'Check for app updates',
		"fr": 'Vérifier les mises à jour de l\'application',
		"it": 'Controlla gli aggiornamenti dell\'app',
		"es": 'Buscar actualizaciones de la aplicación',
		"pt": 'Verificar atualizações do aplicativo',
		"nl": 'Controleren op app-updates',
		"pl": 'Sprawdź aktualizacje aplikacji',
		"ru": 'Проверить обновления приложения',
		"tr": 'Uygulama güncellemelerini kontrol et',
		"zh": '检查应用程序更新',
		"ja": 'アプリの更新を確認',
		"ko": '앱 업데이트 확인',
		"ar": 'تحقق من تحديثات التطبيق'
	}
}

function getRootTranslationContinueWithCache(): RootTranslationForLanguage {
	return {
		"de": 'Mit gespeicherten Daten fortfahren',
		"en": 'Continue with cached data',
		"fr": 'Continuer avec les données mises en cache',
		"it": 'Continua con i dati memorizzati',
		"es": 'Continuar con los datos almacenados en caché',
		"pt": 'Continuar com os dados em cache',
		"nl": 'Doorgaan met gecachte gegevens',
		"pl": 'Kontynuuj z zapisanymi danymi',
		"ru": 'Продолжить с кэшированными данными',
		"tr": 'Önbelleğe alınmış verilerle devam et',
		"zh": '继续使用缓存数据',
		"ja": 'キャッシュされたデータで続行',
		"ko": '캐시된 데이터로 계속',
		"ar": 'تابع مع البيانات المخزنة'
	}
}

function getRootTranslationServerIsOffline(): RootTranslationForLanguage {
	return {
		"de": 'Der Server ist offline.',
		"en": 'The server is offline.',
		"fr": 'Le serveur est hors ligne.',
		"it": 'Il server è offline.',
		"es": 'El servidor está fuera de línea.',
		"pt": 'O servidor está offline.',
		"nl": 'De server is offline.',
		"pl": 'Serwer jest offline.',
		"ru": 'Сервер недоступен.',
		"tr": 'Sunucu çevrimdışı.',
		"zh": '服务器离线。',
		"ja": 'サーバーがオフラインです。',
		"ko": '서버가 오프라인입니다.',
		"ar": 'الخادم غير متصل.'
	}
}