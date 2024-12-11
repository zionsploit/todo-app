import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginInfo, ResponseAccountDto } from 'dto/userDto';
import { Model } from 'mongoose';
import { User } from 'schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('todo_account', 'TodoApp') private userModel: Model<User>,
  ) {}

  async addUser(requestData: CreateUserDto) {
    await new this.userModel(requestData).save();

    return { message: 'new account created' };
  }

  async findUserByCredentials(
    requestData: LoginInfo,
  ): Promise<ResponseAccountDto> {
    const findUserResult = (await this.userModel
      .findOne()
      .where('username')
      .equals(requestData.username)
      .where('password')
      .equals(requestData.password)) as unknown as ResponseAccountDto;

    return findUserResult;
  }
}
