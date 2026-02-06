import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsIn,
  IsBoolean,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Admin User' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mobile?: string | null;

  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin123', minLength: 1 })
  @IsString()
  @MinLength(1)
  password: string;

  @ApiProperty({ enum: ['admin', 'manager'], example: 'manager' })
  @IsString()
  @IsIn(['admin', 'manager'])
  role: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
