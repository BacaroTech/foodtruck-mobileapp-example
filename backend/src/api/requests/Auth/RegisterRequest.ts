import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
