import database from "../config/config";

describe('Firebase Configuration', () => {
    test('Firebase app is initialized correctly', () => {
        // Check if the database variable is defined
        expect(database).toBeDefined();

        // Access the Firebase app instance
        const app = database.app;

        // Check if the app instance is defined
        expect(app).toBeDefined();

        // Check if the app's configuration matches the provided values
        expect(app.options.apiKey).toBe('YOUR_API_KEY');
        expect(app.options.authDomain).toBe('YOUR_AUTH_DOMAIN');
        expect(app.options.databaseURL).toBe('YOUR_DATABASE_URL');
        expect(app.options.projectId).toBe('YOUR_PROJECT_ID');
        expect(app.options.storageBucket).toBe('YOUR_STORAGE_BUCKET');
        expect(app.options.messagingSenderId).toBe('YOUR_MESSAGING_SENDER_ID');
        expect(app.options.appId).toBe('YOUR_APP_ID');
    });
});
