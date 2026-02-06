import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'CUS001' })
  code: string;

  @ApiProperty({ example: 'Customer name' })
  name: string;

  @ApiPropertyOptional()
  email?: string | null;

  @ApiPropertyOptional()
  mobile?: string | null;

  @ApiPropertyOptional({ example: 'b2b' })
  type?: string | null;
}
