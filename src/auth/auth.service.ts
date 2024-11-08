import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  // TODO: Login user (login)
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<String> {
    const {userName, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({where:{ userName : userName}})
    if(user && (await bcrypt.compare(password, user.password))){
      return "Success";
    }
    else{
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  // TODO: Logout user (logout)
  // TODO: delete user
  // TODO: Me user
  // TODO: Learn how salt is compared with random one
}
