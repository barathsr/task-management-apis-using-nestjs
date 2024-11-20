import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import {join} from 'path';

export const typeOrmConfig: object = {
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      };
    },
}

// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
//     database: 'task-management',
//     autoLoadEntities: true,
//     synchronize: true,
// }

