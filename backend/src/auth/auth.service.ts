import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // Test User (เฉพาะในโหมด development)
private readonly testUser = {
  id: 999,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD_HASH,
  email: 'test@example.com'
};

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

async validateUser(username: string, pass: string): Promise<any> {
  if (
    process.env.NODE_ENV !== 'production' &&
    username === this.testUser.username &&
    this.testUser.password &&
    await bcrypt.compare(pass, this.testUser.password)
  ) {
    return {
      id: this.testUser.id,
      username: this.testUser.username,
      email: this.testUser.email,
    };
  }

  const user = await this.usersService.findOneByUsername(username);
  if (user && user.password && (await bcrypt.compare(pass, user.password))) {
    const { password, ...result } = user;
    return result;
  }

  return null;
}


  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.id,
      email: user.email 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}