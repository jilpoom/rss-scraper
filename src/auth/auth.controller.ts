import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auths')
@Controller('/auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO);
    }
}
