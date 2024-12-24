import { Logger } from './logger';

export class ErrorHandler {
    static handle(error: Error, context: string): void {
        Logger.error(`Error in ${context}:`, error);
        // Add error reporting logic here
    }

    static async wrapAsync<T>(
        promise: Promise<T>,
        context: string
    ): Promise<T | undefined> {
        try {
            return await promise;
        } catch (error) {
            this.handle(error as Error, context);
            return undefined;
        }
    }
}