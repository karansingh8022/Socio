const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),//enclosing in string as we want all in string
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;//creating this conf because import.meta.env. is very large so this may not load properly and this will make you app crash 