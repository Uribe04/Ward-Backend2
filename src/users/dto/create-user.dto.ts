export class CreateUserDto {
  username: string;
  email: string;
  password_hash: string;
  bio?: string;
  roleName: string;
}
