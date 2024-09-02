import {CollectionsDatesLastUpdate} from "@/helper/database/databaseTypes/types";

export type MyCacheHelperType = {
    sync_cache_composed_key_local: string | undefined,
    updateFromServer: (version_id?: string) => Promise<void>,
    dependencies: MyCacheHelperDependencyField
}

type MyCacheHelperDependencyField = {
    collections: string[],
    update_always: boolean
}

export function getSyncCacheComposedKey(localCacheHelperObj: MyCacheHelperType, collectionsDatesLastUpdateDict: Record<string, CollectionsDatesLastUpdate | null | undefined>): string | Error {
    let sync_cache_composed = getSyncCacheComposedObj(localCacheHelperObj, collectionsDatesLastUpdateDict);
    if(sync_cache_composed instanceof Error){
        return sync_cache_composed;
    }
    return JSON.stringify(sync_cache_composed);
}

// function typescript which throws an error if the key is not found


export function getSyncCacheComposedObj(localCacheHelperObj: MyCacheHelperType, collectionsDatesLastUpdateDict: Record<string, CollectionsDatesLastUpdate | null | undefined>): Record<string, string> | Error
{
    //console.log("getSyncCacheComposedObj: localCacheHelperObj", localCacheHelperObj);
    let dependencies = localCacheHelperObj.dependencies;
    let collections = dependencies.collections;
    let sync_cache_composed: Record<string, string> = {}
    for(let collection of collections){
        let collectionRemoteVersionInformation = collectionsDatesLastUpdateDict[collection];
        if(collectionRemoteVersionInformation){
            let collection_remote_date_updated = collectionRemoteVersionInformation.date_updated;
            if(collection_remote_date_updated){
                let remoteVersionId = new Date(collection_remote_date_updated).getTime().toString();
                sync_cache_composed[collection] = remoteVersionId;
            }
        } else {
            return new Error("Collection not found in collectionsDatesLastUpdateDict: " + collection);
        }
    }
    return sync_cache_composed;
}

export class MyCacheHelperDeepFields {
    deepFieldList: MyCacheHelperDeepField[];

    constructor(deepFieldList: MyCacheHelperDeepField[]) {
        this.deepFieldList = deepFieldList;
    }

    public getQuery(){
        const fields = this.getFields();
        const deepFields = this.getDeepFields();
        return {
            limit: -1,
            deep: deepFields,
            fields: fields
        }
    }

    public getFields(){
        let fieldsDict: Record<string, boolean> = {}; // with this we can avoid duplicates
        for(let deepField of this.deepFieldList){
            fieldsDict[deepField.field] = true;
        }
        const fieldsList = Object.keys(fieldsDict);
        return fieldsList;
    }

    public getDeepFields(){
        const deepFields: Record<string, { _limit: number }> = {};

        for(let deepField of this.deepFieldList) {
            let field = deepField.field;
            if (field !== "*") {
                let field_without_star = field
                if (field.endsWith(".*")) {
                    field_without_star = field.slice(0, -2);
                }
                deepFields[field_without_star] = {_limit: deepField.limit};
            }
        }
        return deepFields;
    }

    public getDependencies(): MyCacheHelperDependencyField{
        let dependencyCollectionsDict: Record<string, boolean> = {}; // with this we can avoid duplicates
        let download_always: boolean = false;
        for(let deepField of this.deepFieldList){
            const dependency_collections_or_enum_for_field = deepField.dependency_collections_or_enum;
            if(Array.isArray(dependency_collections_or_enum_for_field)){
                if(dependency_collections_or_enum_for_field){
                    for(let dependency_collection of dependency_collections_or_enum_for_field){
                        dependencyCollectionsDict[dependency_collection] = true;
                    }
                }
            }
            if(dependency_collections_or_enum_for_field===MyCacheHelperDependencyEnum.DOWNLOAD_ALWAYS){
                download_always = true;
            }
        }
        const dependencyCollectionsList = Object.keys(dependencyCollectionsDict);

        const returnValue: MyCacheHelperDependencyField = {
            collections: dependencyCollectionsList,
            update_always: download_always
        }
        return returnValue;
    }

}

export enum MyCacheHelperDependencyEnum {
    DOWNLOAD_ALWAYS = "DOWNLOAD_ALWAYS",

}

/**
 * This is a helper to track the field which should be downloaded and which dependency collections are needed for this field
 * @field: the field which should be downloaded
 * @limit: is the field is a relation, this is the limit of the items of that collection which should be downloaded
 * @dependency_collections: the collections which are needed to download the field, which will be checked if they are up to date
 */
type MyCacheHelperDeepField = {
    field: string,
    limit: number,
    dependency_collections_or_enum: string[] | MyCacheHelperDependencyEnum
}