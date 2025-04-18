import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'harry poter' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1995 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  author: number;
}
