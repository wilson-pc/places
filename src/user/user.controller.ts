import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Response,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadDto } from './dto/image-upload-dto';
import { extname } from 'path';
import * as FormData from 'form-data';

@ApiTags('Usuario')
@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private httpService: HttpService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener datos de usuario logueado' })
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return await this.userService.getProfile(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Borrar un usuario' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'subir o actualizar foto de usuario' })
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: (req, file, cb) => {
        fileFilter(req, file, cb, ['.jpg', '.png', '.webp', '.jpeg', '.gif']);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: ImageUploadDto,
  })
  async saveAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Response() res,
    @Request() req,
  ) {
    const form = new FormData();
    form.append('album_id', process.env.ALBUM_ID);
    form.append('auth_token', process.env.TOKEN);
    form.append('action', 'upload');
    form.append('type', 'file');
    form.append('source', file.buffer, { filename: file.originalname });

    try {
      this.httpService
        .post('https://ibb.co/json', form, {
          headers: form.getHeaders(),
        })
        .subscribe({
          next: async (v) => {
            const {
              data: { image },
            } = v;
            console.log(image);
            const avatar: any = {
              url: image.url,

              userId: req.user.id,
              thumb: image.thumb.url,
              medium: image.medium.url,
              deleteUrl: image.delete_url,
            };
            const newAvatar = await this.userService.saveAvatar(avatar);
            delete newAvatar.deleteUrl;
            res.status(200).send(newAvatar);
          },
          error: (e) => {
            res.status(500).send({ message: 'ocurrio un error' });
          },
        });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
function fileFilter(req, file, cb, formats) {
  const ext = extname(file.originalname);
  if (!formats.includes(ext)) {
    return cb(
      new HttpException('Solo se aceptan imagenes', HttpStatus.BAD_REQUEST),
      null,
    );
  }
  cb(null, true);
}
