import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfilDto {
  @ApiProperty({ example: 'kimdur@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '991234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  author: number;
}
