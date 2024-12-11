import mongoose from 'mongoose';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface ResponseUserDto extends Omit<CreateUserDto, 'password'> {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly __v: mongoose.Schema.Types.Number;
  readonly access_token: string;
}

export interface ResponseAccountDto extends CreateUserDto {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly __v: mongoose.Schema.Types.Number;
}

export interface LoginInfo
  extends Pick<CreateUserDto, 'username' | 'password'> {}
