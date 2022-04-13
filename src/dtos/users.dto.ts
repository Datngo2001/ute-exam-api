import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class SignupDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public roleName: string;

  @IsString()
  public fname: string;

  @IsString()
  public lname: string;
}

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public roleName: string;
}

export class UpdateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public roleName: string;
}