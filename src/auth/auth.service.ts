import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './jwt-payload';
import { Login } from './login';
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        public readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(payload: JwtPayload) {
        return this.prisma.user.findUnique({
            where: {
                email: payload.email,
            }
        });
    }
    async login(login: Login) {

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: login.username }, { username: login.username }],
            },
            include: { avatar: { select: { id: true, url: true, thumb: true } } }
        });

        if (user) {
            const compare = compareSync(login.password, user.password);
            if (compare) {
                const token = await this.createToken(user);
                return {
                    user: {
                        email: user.email,
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        avatar: user.avatar
                    },
                    token: token,
                }
            } else {
                throw new HttpException(
                    {
                        message:
                            'usuario o contraseña incorrecta',
                    },
                    HttpStatus.UNAUTHORIZED,
                );
            }
        } else {
            throw new HttpException(
                {
                    message:
                        'usuario o contraseña incorrecta',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }


    }

    async createToken(user: User) {
        const User: JwtPayload = {
            email: user.email,
            id: user.id,
            username: user.username,
        };
        const accessToken = await this.jwtService.sign(User);
        return {
            expiresIn: process.env.EXPIRES_IN,
            accessToken,
        };
    }
}
