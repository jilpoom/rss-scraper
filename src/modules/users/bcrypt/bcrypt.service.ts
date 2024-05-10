import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    hash(password: string): Promise<string> {
        const salt = +process.env.BCRYPT_SALT_ROUNDS;
        return bcrypt.hash(password, salt);
    }

    compare(user_password: string, hashed_password: string): Promise<boolean> {
        return bcrypt.compare(user_password, hashed_password);
    }
}
