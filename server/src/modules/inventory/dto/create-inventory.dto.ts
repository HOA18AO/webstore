import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsOptional()
  @IsString()
  serialCode?: string;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  transactionType?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
