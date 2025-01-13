import * as sdk from 'node-appwrite';



export const {
    NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
    NEXT_PUBLIC_API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_ENDPOINT : ENDPOINT,
    NEXT_PUBLIC_BUCKET_ID : BUCKET_ID
    } = process.env;


    const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client); // Correct initialization
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);


