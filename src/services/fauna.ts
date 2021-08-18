import { Client } from 'faunadb';

export const Fauna = new Client({
    secret: process.env.FAUNA_DB_KEY
})