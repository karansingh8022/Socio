import conf from "../config.js";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Services{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.projectId);

        this.bucket = new Storage(this.client);
        this.databases = new Databases(this.client);
    };

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.databaseId, 
                conf.collectionId, 
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status, 
                    userId,
                })
        } catch (error) {
            console.log(`error occured in createPost: ${error}`);
        }
    };

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId, 
                conf.collectionId, 
                slug, 
                {
                    title,
                    featuredImage, 
                    content,
                    userId, 
                    status,
                })
        } catch (error) {
            console.log(`error occurent in updatePost: ${error}`);
        }
    };

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log(`error occured in deletepost: ${error}`);
            return false;
        }
    };

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
            )
        } catch (error) {
            console.log(`error occured in getPost: ${error}`);
        }
        return false;
    };
 
    async getActivePost(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries,
            )
        } catch (error) {
            console.log(`error occured in getActivePost: ${error}`);
            return false;
        }
    };

    //file uplaad services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(`error occured in uploadfile: ${error}`);
        }
    };

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId,
            )
            return true;
        } catch (error) {
            log(`error occured in deleteFile: ${error}`);
            return false;
        }
    };

    previewFile(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )

        } catch (error) {
            console.log(`error occured in previewFile: ${error}`);
            return false;
        }
    };

}

const services = new Services();

export default services;