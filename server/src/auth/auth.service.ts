import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    plainPassword: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user || !user.active) return null;
    const ok = await bcrypt.compare(plainPassword, user.password);
    if (!ok) return null;
    const rest = { ...user };
    delete rest.password;
    return rest;
  }

  login(user: UserWithoutPassword): { access_token: string } {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
