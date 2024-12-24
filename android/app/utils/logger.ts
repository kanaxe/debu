export class Logger {
    static debug(message: string, ...args: any[]) {
        console.log(`[DEBUG] ${message}`, ...args);
    }

    static error(message: string, error?: Error) {
        console.error(`[ERROR] ${message}`, error);
    }

    static info(message: string, ...args: any[]) {
        console.info(`[INFO] ${message}`, ...args);
    }
}