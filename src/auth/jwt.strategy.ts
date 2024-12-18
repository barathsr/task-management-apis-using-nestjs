import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtPayload } from './dto/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService 
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate(payload: JwtPayload): Promise<User>{
        const { userName } = payload;
        const user: User = await this.userRepository.findOne({where:{userName}})
        
        if (!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}
