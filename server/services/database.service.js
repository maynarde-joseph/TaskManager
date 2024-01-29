import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections = {};

export async function connectToDatabase() {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect();

    // Connect to the database with the name specified in .env
    const db = client.db(process.env.DB_NAME);

    // Connect to the collection with the specific name from .env, found in the database previously specified
    const invoiceCollection = db.collection(process.env.COLLECTION_NAME);

    // Persist the connection to the Games collection
    collections.invoices = invoiceCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${invoiceCollection.collectionName}`,
    );
}