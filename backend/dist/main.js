"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Security: Helmet middleware
    app.use((0, helmet_1.default)());
    // CORS - Allow frontend
    app.enableCors({
        origin: [
            process.env.FRONTEND_URL || 'http://localhost:3001',
            process.env.PROD_FRONTEND_URL || 'https://devoteesworld.com',
        ],
        credentials: true,
    });
    // Global validation
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    // API prefix
    app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');
    // Swagger documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DevoteeWorld API')
        .setDescription('Hindu Religious Platform API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth')
        .addTag('Users')
        .addTag('Events')
        .addTag('Bookings')
        .addTag('Payments')
        .addTag('Admin')
        .addTag('Analytics')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    // Swagger UI - publicly accessible
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 3000;
    // Dynamic seed import
    try {
        const { SeedService } = await Promise.resolve().then(() => __importStar(require('./database/seeds')));
        const seedService = app.get(SeedService);
        await seedService.seed();
    }
    catch (error) {
        console.log('⚠️ Seed service not available, skipping seed');
    }
    await app.listen(port);
    console.log(`🚀 DevoteeWorld Backend running on port ${port}`);
    console.log(`📚 API Docs: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map