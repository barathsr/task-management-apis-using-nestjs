import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const {userName, password} = authCredentialsDto;
    const user = await this.userRepository.findOne({where:{ userName : userName}})
    if(user && (await bcrypt.compare(password, user.password))){
      const payload:JwtPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken }
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
