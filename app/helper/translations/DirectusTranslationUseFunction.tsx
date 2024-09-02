import {useProfileLanguageCode} from '@/states/SynchedProfile';
import {DirectusTranslationHelper} from '@/helper/translations/DirectusTranslationHelper';
import {StringHelper} from '@/helper/string/StringHelper';

export type TranslationEntry = {
    languages_code: string,
    [key: string]: any
}

export const MISSING_TRANSLATION = 'Missing translation';

export function getDirectusTranslationUnsafe(languageCode: string, translations: TranslationEntry[], field: string, ignoreFallbackLanguage?: boolean, fallback_text?: string | null | undefined, params?: any): string | null {
	let translation = getDirectusTranslation(languageCode, translations, field, ignoreFallbackLanguage, fallback_text, params);
	if (translation.startsWith(MISSING_TRANSLATION)) {
		return null;
	}
	return translation;
}

export function getDirectusTranslation(languageCode: string, translations: TranslationEntry[], field: string, ignoreFallbackLanguage?: boolean, fallback_text?: string | null | undefined, params?: any): string {
	const translationDict = getLanguageDict(translations);

  type TranslationDict = {[key: string]: TranslationEntry};

  function getLanguageDict(translations: TranslationEntry[]) {
  	const translationDict: TranslationDict = {};
  	if (!!translations && translations.length > 0) {
  		for (const translation of translations) {
  			translationDict[translation?.languages_code] = translation;
  		}
  	}
  	return translationDict;
  }

  function getTranslation(translationDict: TranslationDict, languages_code: string, params?: any) {
  	const translationEntry = translationDict[languages_code];
  	if (!translationEntry) {
  		return null;
  	}
  	let translation = translationEntry[field]
  	if (params) {
  		const paramKeys = Object.keys(params);
  		for (let i=0; i<paramKeys.length; i++) {
  			const paramKey = paramKeys[i];
  			const paramValue = params[paramKey];
  			translation = StringHelper.replaceAll(translation, '%'+paramKey, paramValue);
  		}
  	}
  	return translation;
  }

  const translation = getTranslation(translationDict, languageCode, params);
  if (translation) {
  	return translation
  }

  // First fallback language
  let default_language_code = DirectusTranslationHelper.FALLBACK_LANGUAGE_CODE_ENGLISH;
  let fallback_translation = getTranslation(translationDict, default_language_code, params);
  if (!!fallback_translation && !ignoreFallbackLanguage) { //TODO: maybe allow an user to set a proposal for his language
  	return fallback_translation
  }

  // Second fallback language
  default_language_code = DirectusTranslationHelper.DEFAULT_LANGUAGE_CODE_GERMAN;
  fallback_translation = getTranslation(translationDict, default_language_code, params);
  if (!!fallback_translation && !ignoreFallbackLanguage) { //TODO: maybe allow an user to set a proposal for his language
  	return fallback_translation
  }

  if (fallback_text!==undefined && fallback_text!==null) {
  	return fallback_text;
  }

  return MISSING_TRANSLATION + "(" + field + ")";
}


export function useDirectusTranslation(translations: TranslationEntry[], field: string, ignoreFallbackLanguage?: boolean, fallback_text?: string, params?: any): string {
	const [languageCode, setLanguageCode] = useProfileLanguageCode();
	return getDirectusTranslation(languageCode, translations, field, ignoreFallbackLanguage, fallback_text, params);
}
