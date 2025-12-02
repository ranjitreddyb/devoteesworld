import { ConfigService } from '@nestjs/config';
export declare class ConfigEngineService {
    private configService;
    constructor(configService: ConfigService);
    getLanguageConfig(ipAddress: string): Promise<{
        defaultLanguage: any;
        detectedLanguage: string;
        supportedLanguages: string[];
        current: any;
    }>;
    private detectLanguageByIP;
    uploadEventsFromExcel(excelFilePath: string): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
    setEnvironment(env: 'dev' | 'prod'): Promise<{
        environment: "dev" | "prod";
        active: boolean;
    }>;
}
//# sourceMappingURL=config-engine.service.d.ts.map