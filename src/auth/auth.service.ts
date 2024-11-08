import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // TODO: Create user (signup)
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  // TODO: Login user (login)
  // TODO: Logout user (logout)
  // TODO: delete user
  // TODO: Me user
}
