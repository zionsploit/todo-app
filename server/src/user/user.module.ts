import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schema/user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'todo_account', schema: UserSchema }],
      'TodoApp',
    ),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
