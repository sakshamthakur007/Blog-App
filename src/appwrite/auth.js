import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            console.log('Creating account with email:', email);
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log('Account created:', userAccount);
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            console.log('Attempting to log in with email:', email);
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log('Logged in successfully:', session);
            return session;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            console.log('Fetching current user');
            const user = await this.account.get();
            console.log('Current user:', user);
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    async logout() {
        try {
            console.log('Attempting to log out');
            await this.account.deleteSessions();
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
}

const authService = new AuthService();
export default authService;
