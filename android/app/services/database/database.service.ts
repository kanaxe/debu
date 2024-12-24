import { knownFolders } from '@nativescript/core';
import { DATABASE_CONFIG } from './database-config';
import { Conversation } from './models/conversation.model';
import { Preference } from './models/preference.model';
const SQLite = require('sqlite-sync');

export class DatabaseService {
    private db: any;
    private static instance: DatabaseService;

    private constructor() {
        const dbPath = `${knownFolders.documents().path}/${DATABASE_CONFIG.filename}`;
        this.db = SQLite.connect(dbPath);
        this.initTables();
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    private initTables() {
        this.db.run(`CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT,
            bot_response TEXT,
            language TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        this.db.run(`CREATE TABLE IF NOT EXISTS preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE,
            value TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }

    public saveConversation(conversation: Omit<Conversation, 'id' | 'timestamp'>) {
        return this.db.run(
            'INSERT INTO conversations (user_input, bot_response, language) VALUES (?, ?, ?)',
            [conversation.user_input, conversation.bot_response, conversation.language]
        );
    }

    public getConversationHistory(): Conversation[] {
        return this.db.run('SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 100');
    }
}