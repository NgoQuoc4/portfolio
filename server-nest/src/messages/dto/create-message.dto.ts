import { IsString, IsEmail } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
