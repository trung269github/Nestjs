import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users/users.service';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql_db',
    port: 3306,
    username: 'root',
    password: 'trung26903',
    database: 'training',
    entities: [User, Profile],
    synchronize: true,
  }),
  UsersModule,
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
