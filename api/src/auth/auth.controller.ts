import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Login } from './interfaces/login.interface';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() login: Login): Promise<IResponse> {
    try {
      let response = await this.authService.validateLogin(
        login.email,
        login.password,
      );
    } catch (error) {
      return new ResponseError('LOGIN.ERROR', error);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      let newUser = new UserDto(
        await this.usersService.createNewUser(createUserDto),
      );
      // let newUser = await this.usersService.createNewUser(createUserDto);
      // await this.authService.createEmailToken(newUser.email);
      // send verification email?
      console.log(`Creating new user with email ${createUserDto.email}`);
    } catch (error) {
      console.log(`Error Message: ${JSON.stringify(error)}`);
      return new ResponseError('REGISTRATION.ERROR.GENERIC_ERROR');
    }
  }
}
