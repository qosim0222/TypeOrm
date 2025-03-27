import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Jack' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: 1990})
  @IsNotEmpty()
  @IsNumber()
  age:number
}
