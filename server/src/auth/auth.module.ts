import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'todo_account', schema: UserSchema }],
      'TodoApp',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule {}
