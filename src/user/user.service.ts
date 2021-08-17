import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';
import { Avatar, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(public readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    try {
      data.password = hashSync(data.password, Number(process.env.SALT_ROUND));
      const user = await this.prisma.user.create({ data: data });
      return user;
    } catch {}
  }

  findAll() {
    return `This action returns all user`;
  }
  async saveAvatar(avatar: Avatar) {
    const prev = await this.prisma.avatar.findFirst({
      where: { userId: avatar.userId },
    });
    if (prev) {
      await this.prisma.avatar.delete({ where: { id: prev.id } });
    } else {
      return this.prisma.avatar.create({ data: avatar });
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  async getProfile(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
        include: {
          avatar: {
            select: { id: true, url: true, thumb: true, medium: true },
          },
        },
      });
      return user;
    } catch {}
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id: id } });
      return { message: 'usuario eliminado' };
    } catch (error) {}
  }
}
