import { Module } from '@nestjs/common';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    // JwtModule types are not fully resolved by ESLint type-aware rules

    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => {
        const secret =
          process.env.JWT_SECRET ?? 'fallback-secret-change-in-env';
        const expiresIn = process.env.JWT_EXPIRES_IN ?? '1d';
        return {
          secret,
          signOptions: { expiresIn },
        } as JwtModuleOptions;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
