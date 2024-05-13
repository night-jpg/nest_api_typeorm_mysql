import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUser } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { RoleGuard } from '../guards/rule.guard';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseInterceptors(LogInterceptor)

  //@Throttle()
  //@SkipThrottle()
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() idusers: number) {
    return this.userService.show(idusers);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() idusers: number) {
    return this.userService.update(idusers, data);
  }

  @Patch(':id')
  async patch(@Body() data: UpdatePatchUser, @ParamId() idusers: number) {
    return this.userService.patch(idusers, data);
  }

  @Delete(':id')
  async delete(@ParamId() idusers: number) {
    return {
      success: await this.userService.delete(idusers),
    };
  }
}
