import { MongoClient, Db } from 'mongodb';
import assert from 'assert';
import { logger } from '../utils/Utils';

let client: MongoClient;
let db: Db;

export const collections = {
    USERS: 'users',
};

export async function connectToDB() {
    if(!process.env.MONGODB_URL) throw new Error("Missing MONGODB_URL in the .env");
    if(!process.env.DB_NAME) throw new Error("Missing DB_NAME in the .env");

    client = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });

    client.connect(function(err) {
        assert.strictEqual(null, err);
        logger.system("Successfully connected to the MongoDb database");
    });

    db = client.db(process.env.DB_NAME);

    await createCollections();

    async function createCollections() {
        if(!db.collection("users")) await db.createCollection("users");
    }
}

export function insertData(collection_name: string, data: any[] | any): Promise<any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(Array.isArray(data)) {
            collection.insertMany(data, function(err, result) {
                if(err) reject(err);
                resolve(result);
            });
        } else {
            collection.insertOne(data, function(err, result) {
                if(err) reject(err);
                resolve(result);
            });
        }
    }) 
}

export function getData(collection_name: string, filters: any | undefined, isMany: boolean | undefined): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.find(filters ? filters : {}).toArray(function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            });
        } else {
            collection.findOne(filters ? filters : {}, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            });
        }
    })
}

export function updateData(collection_name: string, filters: any, data: any, isMany: boolean | undefined) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.updateMany(filters, { $set: data }, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        } else {
            collection.updateOne(filters, { $set: data }, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        }
    })
}

export function deleteData(collection_name: string, filters: any, isMany: boolean | undefined) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collection_name);
        if(isMany) {
            collection.deleteMany(filters, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        } else {
            collection.deleteOne(filters, function(err, output_data) {
                if(err) reject(err);
                resolve(output_data);
            }); 
        }
    })
}