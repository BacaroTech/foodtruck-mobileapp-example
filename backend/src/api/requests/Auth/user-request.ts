import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserPWRequest {

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}

export class UserByAdminPWRequest {

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  uuid: string;
}