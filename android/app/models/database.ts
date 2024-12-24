import { knownFolders } from '@nativescript/core';
const SQLite = require('sqlite-sync');

export class Database {
    private db: any;
    private static instance: Database;

    private constructor() {
        const dbPath = knownFolders.documents().path + '/aibot.db';
        this.db = SQLite.connect(dbPath);
        this.initTables();
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private initTables() {
        // Conversations table for learning
        this.db.run(`CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT,
            bot_response TEXT,
            language TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // User preferences
        this.db.run(`CREATE TABLE IF NOT EXISTS preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE,
            value TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }

    public saveConversation(userInput: string, botResponse: string, language: string) {
        this.db.run(
            'INSERT INTO conversations (user_input, bot_response, language) VALUES (?, ?, ?)',
            [userInput, botResponse, language]
        );
    }

    public getConversationHistory(): any[] {
        return this.db.run('SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 100');
    }
}