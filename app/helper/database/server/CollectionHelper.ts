import {
	DirectusClient,
	RestClient,
	createItem,
	deleteItem,
	deleteItems,
	readItem,
	readItems,
	readSingleton,
	updateItem,
	updateItems,
} from '@directus/sdk';
import {CustomDirectusTypes} from '@/helper/database/databaseTypes/types';


export class CollectionHelper<CollectionScheme> {
	private collection: string;

	constructor(collection: string, client?: DirectusClient<CustomDirectusTypes> & RestClient<any>) {
		this.collection = collection;
	}

	static getQueryWithRelatedFields(fields: string[]) {
		return {
			fields: fields,
		};
	}

}