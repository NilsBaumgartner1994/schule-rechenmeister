import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {Languages, Profiles} from '@/helper/database/databaseTypes/types';
import {
    NewValueRawSingleType,
    useSynchedResourceSingleRawValue,
    useSynchResourceSingleRawSetter
} from '@/states/SynchedResource';
import {useIsCurrentUserAnonymous} from '@/states/User';
import {useIsServerOnline} from '@/states/SyncStateServerInfo';
import {DirectusTranslationHelper} from '@/helper/translations/DirectusTranslationHelper';
import {useCallback} from "react";
import {useLocales as useLocalesExpo} from "expo-localization";
import {useSynchedLanguagesDict} from "@/states/SynchedLanguages";
import {PlatformHelper} from "@/helper/PlatformHelper";
import {NonPersistentStore} from "@/helper/syncState/NonPersistentStore";

export function useSynchedProfileSetter(): [(callback: (currentValue: Partial<Profiles> | null | undefined) => Partial<Profiles> | null | undefined, sync_cache_composed_key_local?: string) => void, (callback: (currentValue: NewValueRawSingleType<Partial<Profiles>> | null | undefined) => NewValueRawSingleType<Partial<Profiles>> | null | undefined) => void] {
    const [setResource, setResourceRaw] = useSynchResourceSingleRawSetter<Partial<Profiles>>(NonPersistentStore.profile);

    const isServerOnline = useIsServerOnline()
    const isCurrentUserAnonymous = useIsCurrentUserAnonymous();

    const usedSetResource = useCallback(
        (callback: (currentValue: Partial<Profiles> | null | undefined) => Partial<Profiles> | null | undefined, sync_cache_composed_key_local?: string) => {
            //console.log("setProfile, isServerOnline: ", isServerOnline, "isCurrentUserAnonymous: ", isCurrentUserAnonymous)

            setResource((currentValue) => {
                const newValue = callback(currentValue);
                const profile_id = newValue?.id || currentValue?.id;

                if (isServerOnline && !isCurrentUserAnonymous) {
                    if (profile_id && newValue) {
                        //console.log('profile_id: ', profile_id);
                        return newValue;
                    } else {
                        console.error('Profile ID not found');
                    }
                }

                return newValue;
            }, sync_cache_composed_key_local);
        },
        // Dependencies for useCallback
        [isServerOnline, isCurrentUserAnonymous, setResource]
    );

    return [usedSetResource, setResourceRaw]
}

export type Player = {
    id: number;
    name: string;
    score: number;
}

export function useCurrentPlayers(): [Player | null | undefined, (player: Player) => void, () => void, Record<string, Player>, (newPlayers: Record<string, Player> | null | undefined) => void] {
    const [profile, setProfile] = useSynchedProfile();
    console.log("useCurrentPlayers, profile: ", profile);
    const currentPlayerId = profile?.currentPlayerId || 1;
    const players: Record<string, Player> = profile?.players || {}
    const currentPlayer = players[currentPlayerId];
    const setPlayers = useCallback((newPlayers: Record<string, Player> | null | undefined) => {
            setProfile((currentValue) => {
                console.log("setPlayers, newPlayers: ", newPlayers);
                if(!currentValue){
                    currentValue = {};
                }
                if(currentValue){
                    currentValue.players = newPlayers;
                }
                console.log("setPlayers, currentValue: ", currentValue);
                return currentValue;
            });
        }, [setProfile]);

    const setCurrentPlayer = useCallback((player: Player) => {
            setProfile((currentValue) => {
                if(currentValue){
                    currentValue.currentPlayerId = player.id;
                }
                return currentValue;
            });
        }, [setProfile]);
    const setNextCurrentPlayer = useCallback(() => {
            setProfile((currentValue) => {
                if(currentValue){
                    const keys = Object.keys(currentValue.players);
                    const currentPlayerId = currentValue.currentPlayerId || 1;
                    const currentPlayerIndex = keys.indexOf(currentPlayerId.toString());
                    const nextPlayerIndex = (currentPlayerIndex + 1) % keys.length;
                    const nextPlayerId = keys[nextPlayerIndex];
                    currentValue.currentPlayerId = parseInt(nextPlayerId);
                }
                return currentValue;
            });
        }, [setProfile]);


    return [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers];

}

export function useSynchedProfileId(): string | null | undefined {
    const profile = useSynchedResourceSingleRawValue<Profiles, (string | null | undefined)>(NonPersistentStore.profile, (storedProfileRaw) => {
        return storedProfileRaw?.data?.id
    });
    return profile;
}

export function useSynchedProfile(): [Partial<Profiles>, (callback: (currentValue: Partial<Profiles> | null | undefined) => Partial<Profiles> | null | undefined, sync_cache_composed_key_local?: string) => void]
{
    //const [resourceOnly, setResource, resourceRaw, setResourceRaw] = useSynchedResourceSingleRaw<Partial<Profiles>>(NonPersistentStore.profile);
    const [usedSetResource, setResourceRaw] = useSynchedProfileSetter();
    const resourceRaw = useSynchedResourceSingleRawValue<Profiles, NewValueRawSingleType<Profiles>>(NonPersistentStore.profile)
    const resourceOnly = resourceRaw?.data

    let usedResource = resourceOnly;
    if (!usedResource) {
        usedResource = {}
    }

    return [usedResource, usedSetResource]
}

export function useProfileLanguageCode(): [string, ((newValue: string | null | undefined) => void), string | Languages | null | undefined] {
    //const [profile, setProfile] = useSynchedProfile();
    const [setProfile] = useSynchedProfileSetter();
    const deviceLocaleCodesWithoutRegionCode = useDeviceLocaleCodesWithoutRegionCode();
    const [languageDict, setLanguageDict] = useSynchedLanguagesDict();

    const profileLanguageSaved = useSynchedResourceSingleRawValue<Profiles, (string | Languages | null | undefined)>(NonPersistentStore.profile, (storedProfileRaw) => {
        return storedProfileRaw?.data?.language
    });


    const setLanguage = useCallback((newLanguage: string | null | undefined) => {
            setProfile((currentValue) => {
                if(currentValue){
                    currentValue.language = newLanguage;
                }
                return currentValue;
            });
        },
        [setProfile]
    );

    let usedLanguage: string = getBestLanguageCodeForProfile(profileLanguageSaved, deviceLocaleCodesWithoutRegionCode, languageDict);
    return [usedLanguage, setLanguage, profileLanguageSaved];
}

function getBestLanguageCodeForProfile(profileLanguage: string | Languages | null | undefined, deviceLocaleCodesWithOrWithoutRegionCode: string[], languageDict: Record<string, Languages | null | undefined> | null | undefined): string {
    let languageCodeOrderToCheck: string[] = [];

    // most important is the locale saved in the profile
    if(!!profileLanguage){
        if (typeof profileLanguage === "string") {
            languageCodeOrderToCheck.push(profileLanguage);
        } else {
            let profileLanguageCode = profileLanguage.code;
            languageCodeOrderToCheck.push(profileLanguageCode);
        }
    }

    // we then would like to use the device locale
    languageCodeOrderToCheck = languageCodeOrderToCheck.concat(deviceLocaleCodesWithOrWithoutRegionCode);

    const serverLanguageDict = languageDict;
    // if we have knowledge about which languages the server supports, we can use this information
    if(!!serverLanguageDict){
        // we want to use the first language code that is supported by the server
        for (let i=0; i<languageCodeOrderToCheck.length; i++) {
            let languageCode = languageCodeOrderToCheck[i];
            let matchingLanguage = getMatchingLanguageCode(languageCode, serverLanguageDict);
            if (matchingLanguage) {
                return matchingLanguage.code;
            }
        }
    }

    // if we have no knowledge about which languages the server supports,
    // we want to check if in the languageCodeOrderToCheck the first one is
    // DEFAULT_LANGUAGE_CODE_GERMAN or FALLBACK_LANGUAGE_CODE_ENGLISH
    const defaultLanguageCode = DirectusTranslationHelper.DEFAULT_LANGUAGE_CODE_GERMAN;
    const defaultFallbackLanguageCode = DirectusTranslationHelper.FALLBACK_LANGUAGE_CODE_ENGLISH;

    for (let i=0; i<languageCodeOrderToCheck.length; i++) {
        let languageCode = languageCodeOrderToCheck[i];
        if (isLanguageCodeMatchingServerLanguageCode(languageCode, defaultLanguageCode)) {
            return defaultLanguageCode
        }
        if (isLanguageCodeMatchingServerLanguageCode(languageCode, defaultFallbackLanguageCode)) {
            return defaultFallbackLanguageCode
        }
    }

    // okay, we have no DEFAULT_LANGUAGE_CODE_GERMAN, so we just use the fallback
    return DirectusTranslationHelper.FALLBACK_LANGUAGE_CODE_ENGLISH;
}

function getMatchingLanguageCode(languageCodeWithOrWithoutRegionCode: string, serverLanguageDict: Record<string, Languages | null | undefined>): Languages | null {
    const languageCodeWithOrWithoutRegionCodeLower = languageCodeWithOrWithoutRegionCode.toLowerCase();

    let serverLanguageKeys = Object.keys(serverLanguageDict);
    for (let i=0; i<serverLanguageKeys.length; i++) {
        let serverLanguageKey = serverLanguageKeys[i];
        const languageSupportedByServer = serverLanguageDict[serverLanguageKey];
        if(languageSupportedByServer){
            const serverLanguageCodeWithRegion = languageSupportedByServer.code;
            const serverLanguageCodeWithRegionLower = serverLanguageCodeWithRegion.toLowerCase();
            // serverLanguageCodeWithRegion could be "de-DE"
            // serverLanguageCodeWithRegionLower could be "de-de"
            // languageCodeWithOrWithoutRegionCodeLower could be "de-de" or "de"

            // if the one is a substring of the other, we have a match
            if (isLanguageCodeMatchingServerLanguageCode(languageCodeWithOrWithoutRegionCodeLower, serverLanguageCodeWithRegionLower)) {
                return languageSupportedByServer
            }
        }
    }
    return null;
}

function isLanguageCodeMatchingServerLanguageCode(languageCodeWithOrWithoutRegionCode: string, serverLanguageCodeWithRegion: string): boolean {
    const languageCodeWithOrWithoutRegionCodeLower = languageCodeWithOrWithoutRegionCode.toLowerCase();
    const serverLanguageCodeWithRegionLower = serverLanguageCodeWithRegion.toLowerCase();
    // serverLanguageCodeWithRegion could be "de-DE"
    // serverLanguageCodeWithRegionLower could be "de-de"
    return serverLanguageCodeWithRegionLower.includes(languageCodeWithOrWithoutRegionCodeLower) || languageCodeWithOrWithoutRegionCodeLower.includes(serverLanguageCodeWithRegionLower);
}

function useDeviceLocaleCodesWithoutRegionCode(): string[] {
    const locales = useLocalesExpo()
    let localeCodes: string[] = [];
    for (let i=0; i<locales.length; i++) {
        let locale = locales[i];
        //locale.languageCode; // e.g. "en"
        localeCodes.push(locale.languageTag); // "de" or "de-DE"
    }

    const defaultLanguageCode = DirectusTranslationHelper.DEFAULT_LANGUAGE_CODE_GERMAN;
    const defaultFallbackLanguageCode = DirectusTranslationHelper.FALLBACK_LANGUAGE_CODE_ENGLISH;

    // Workaround for issue #134 - temporarily
    if(PlatformHelper.isWeb()){ // on Web the locale order does not work properly
        // sort the default language code if it is in the list to the front
        localeCodes = localeCodes.sort((a, b) => {
            if (isLanguageCodeMatchingServerLanguageCode(a, defaultLanguageCode)) {
                return -1;
            } else if (isLanguageCodeMatchingServerLanguageCode(b, defaultLanguageCode)) {
                return 1;
            } else {
                return 0;
            }
        });
    }


    return localeCodes;
}

export function useProfileLocaleForJsDate(): string {
    const [language, setLanguage] = useProfileLanguageCode();
    let locale = language;
    if (locale) {
        locale = locale.toLowerCase() //"en-US" --> "en-us"; since js uses lowercase
    }
    // TODO: check if locale is valid as ISO 639-1 code or something like that
    return locale;
}