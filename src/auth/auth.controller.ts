import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@ApiTags('Autentificacion')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Entrar al sistema' })
    @Post('login')
    async Login(
        @Body() data: LoginDto,

    ): Promise<any> {

        return await this.authService
            .login({ username: data.username, password: data.password })

    }

}
