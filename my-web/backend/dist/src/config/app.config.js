"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const appConfig = () => ({
    port: parseInt(process.env.PORT ?? '3001', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    database: {
        url: process.env.DATABASE_URL ?? '',
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET ?? 'access-secret-change-me',
        refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret-change-me',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    },
    redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        password: process.env.REDIS_PASSWORD ?? '',
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
        apiKey: process.env.CLOUDINARY_API_KEY ?? '',
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY ?? '',
        model: process.env.OPENAI_MODEL ?? 'gpt-4o',
        embeddingModel: process.env.OPENAI_EMBEDDING_MODEL ?? 'text-embedding-ada-002',
    },
    mail: {
        host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
        port: parseInt(process.env.MAIL_PORT ?? '587', 10),
        user: process.env.MAIL_USER ?? '',
        password: process.env.MAIL_PASSWORD ?? '',
        from: process.env.MAIL_FROM ?? 'noreply@phoneshop.vn',
    },
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
});
exports.appConfig = appConfig;
//# sourceMappingURL=app.config.js.map