import { getDB } from "../database/db";


const db =  getDB();

if (db){
    console.log("db ok");
    console.log(db);
}

