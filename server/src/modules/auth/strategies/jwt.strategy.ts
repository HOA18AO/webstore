import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';

export type JwtPayload = { sub: number; username: string; role: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-change-in-env',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
    });
    if (!user || !user.active) {
      throw new UnauthorizedException();
    }
    const rest = { ...user };
    delete (rest as Record<string, unknown>).password;
    return rest;
  }
}
