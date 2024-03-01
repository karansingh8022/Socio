import conf from "../config.js";
import { Client, Account, ID, AppwriteException } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
                .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
    };

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log(`error in creating account: ${error}`);
        }
    };

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(`error occured in login: ${error}`);
        }
    };

    async createSession(){
        try {
            return await this.account.createAnonymousSession();
        } catch (error) {
            console.log(`error occured in createSession: ${error}`);
        }
    }

    async getCurrentUser() {
        try {
            const session = await this.account.get();
            if (session) {
                return session;
            } else {
                console.log('User session is empty');
                return null;
            }
        } catch (error) {
            console.error(`Error in getCurrentUser: ${error.message}`);
            return null;
        }
    }
    
    

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`error occured in logout: ${error}`);
        }
    };
}

const authService = new AuthService();

export default authService;







