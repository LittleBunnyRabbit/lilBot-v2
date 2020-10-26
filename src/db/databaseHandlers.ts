import * as mongoDB from './mongoDB';
import { lilUserJson } from '../imports/types/UserTypes';
import { logger } from '../utils/Utils';

// USERS
export async function addUser(user_json: lilUserJson) {
    logger.db(`Added user '${user_json._id}'`);
    return mongoDB.insertData(mongoDB.collections.USERS, user_json);
}

export async function updateUser(_id: any, data: any) {
    logger.db(`Updated user '${_id}'`);
    return mongoDB.updateData(mongoDB.collections.USERS, { _id }, data, false);
}

export async function getUserById(_id: string): Promise<lilUserJson> {
    logger.db(`Fetched user '${_id}' by id`);
    return mongoDB.getData(mongoDB.collections.USERS, { _id }, false);
}

export async function getUsersByParams(params: any): Promise<lilUserJson[]> {
    logger.db('Fetched user by params');
    return mongoDB.getData(mongoDB.collections.USERS, params, true);
}

export async function getAllUsers(): Promise<lilUserJson[]> {
    logger.db('Fetched all users');
    return mongoDB.getData(mongoDB.collections.USERS, {}, true);
}

export async function deleteUserById(_id: any) {
    return mongoDB.deleteData(mongoDB.collections.USERS, { _id }, false);
}