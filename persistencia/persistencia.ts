import { createPool } from 'mysql2/promise';
const { database }  = require('../keys');

export async function pool(){
    const connection = await createPool({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database
    });

    return connection;
}