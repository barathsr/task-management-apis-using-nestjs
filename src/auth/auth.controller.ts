import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.authService.getUser();
  }
}
