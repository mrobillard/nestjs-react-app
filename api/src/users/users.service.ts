import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createNewUser(newUser: CreateUserDto): Promise<User> {
    if (this.isValidEmail(newUser.email) && newUser.password) {
      // make sure user is not already registered
      let userRegistered = await this.findByEmail(newUser.email);
      if (!userRegistered) {
        let hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);
        let createdUser = new this.userModel(newUser);
        createdUser.password = hashedPassword;
        createdUser.roles = ['user'];
        return await createdUser.save();
      } else {
        throw new HttpException(
          'REGISTRATION.USER_ALREADY_REGISTERED',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        'REGISTRATION.MISSING_MANDATORY_PARAMETERS',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  isValidEmail(email: string) {
    if (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }
}
