export declare const appConfig: () => {
    port: number;
    nodeEnv: string;
    database: {
        url: string;
    };
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    redis: {
        host: string;
        port: number;
        password: string;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
    openai: {
        apiKey: string;
        model: string;
        embeddingModel: string;
    };
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
    frontendUrl: string;
    cors: {
        allowedOrigins: string;
    };
};
