import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const {userName, password} = authCredentialsDto;
    const user =  this.create({userName, password});
    try{
      await this.save(user);
    }
    catch(error){
      if(error.code === '23505'){
        throw new ConflictException('User already exists');
      }
      else{
        throw new InternalServerErrorException('Wrong action')
      }
    }
    return user;
  }
}
