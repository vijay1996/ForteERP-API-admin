import mongoose from 'mongoose';
import dotenv from 'dotenv';
import collections from './collections.js';

dotenv.config();
mongoose.connect(process.env.ADMIN_DB_URL as string).then(data => {
    console.log("Connected to the database successfully!");
}).catch(err => {
    console.log(err);
});

export async function INSERT (collection: string, record:any) {
    console.log(`Attempting to INSERT - \nCollection: ${collection} \nFilter: ${JSON.stringify(record)}\n`);
    const payload:Array<any>  = Array.isArray(record) ? record : [record];
    //@ts-ignore
    return await collections[`${collection}`].insertMany(payload);
}

export async function UPDATE (collection:string, filter:any) {
    console.log(`Attempting to UPDATE - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    //@ts-ignore
    return await collections[`${collection}`].findOneAndUpdate({_id: filter._id}, filter);
}

export async function DELETE (collection:string, filter:any) {
    console.log(`Attempting to DELETE - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    //@ts-ignore
    return await collections[`${collection}`].deleteMany({_id: {$in: filter}});
}

export async function SEARCH_LIST (collection:string, filter:any, search:string) {
    console.log(`Attempting to SEARCH_LIST "${search}" - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    const searchedRecords: Array<any> = [];
    //@ts-ignore
    const allRecords = await collections[`${collection}`].find(filter)
    allRecords.forEach((record:any) => {
        JSON.stringify(record).toLowerCase().indexOf(search.toLowerCase()) !== -1 && searchedRecords.push(record);
    });
    return searchedRecords;
}

export async function LIST (collection:string, filter:any) {
    console.log(`Attempting to LIST - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    const regexFilter: any = {};
    Object.keys(filter).forEach((key: string) => {
        const fieldValue = filter[`${key}`]
        fieldValue && (regexFilter[`${key}`] = new RegExp(fieldValue, "i"));
    })
    //@ts-ignore
    return await collections[`${collection}`].find(regexFilter);
}

export async function DYNAMIC_SELECT (collection:string, filter:any) {
    console.log(`Attempting to fetch values for DYNAMIC_SELECT - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    const fieldKey = Object.keys(filter)[0];
    const fieldvalue = filter[`${fieldKey}`];
    if (!fieldvalue) return [];
    const FILTER:any = {};
    fieldvalue && (FILTER[`${fieldKey}`] = new RegExp(fieldvalue, "i"))
    //@ts-ignore    
    return await collections[`${collection}`].find(FILTER, fieldKey);
}

export async function FIND_ONE (collection:string, filter:any) {
    console.log(`Attempting to fetch values for FIND_ONE - \nCollection: ${collection} \nFilter: ${JSON.stringify(filter)}\n`);
    //@ts-ignore
    return await collections[`${collection}`].findOne(filter)
}