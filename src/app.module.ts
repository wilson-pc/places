import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, PostModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
