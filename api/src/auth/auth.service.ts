import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validateLogin(email: string, password: string) {
    console.log(`Validate Login`);
  }

  async createEmailToken(email: string) {
    console.log(`Create Email Token`);
  }
}
