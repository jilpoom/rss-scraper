import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type jwtConfig = {
    access_token_secret_key: string;
    refresh_token_secret_key: string;
    access_token_expires_in: string;
    refresh_token_expires_in: string;
};

export type serverConfig = {
    port: string;
    env: string;
};

export type dbConfig = {
    db_url: string;
};

@Injectable()
export class CustomConfigService {
    constructor(private readonly config: ConfigService) {}

    getJwtConfig(): jwtConfig {
        return {
            access_token_secret_key: this.config.get<string>('JWT_TOKEN_SECRET_KEY')!,
            access_token_expires_in: this.config.get<string>('JWT_TOKEN_EXPIRES_IN')!,
            refresh_token_secret_key: this.config.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY')!,
            refresh_token_expires_in: this.config.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN')!,
        };
    }

    getServerConfig(): serverConfig {
        return {
            port: this.config.get<string>('PORT')!,
            env: this.config.get<string>('ENV')!,
        };
    }

    getDbConfig(): dbConfig {
        return {
            db_url: this.config.get<string>('DEV_DATABASE_URL')!,
        };
    }
}
