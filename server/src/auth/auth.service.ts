import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInfo, ResponseUserDto } from 'dto/userDto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(requestData: LoginInfo): Promise<ResponseUserDto> {
    const getUser = await this.userService.findUserByCredentials(requestData);

    if (getUser?.password !== undefined && getUser?.username !== undefined) {
      const payload = {
        sub: getUser?._id,
        username: getUser.firstName,
      };

      return {
        _id: getUser._id,
        __v: getUser.__v,
        firstName: getUser.firstName,
        lastName: getUser.firstName,
        username: getUser.username,
        access_token: await this.jwtService.signAsync(payload, {
          secret: 'secretKey',
          privateKey: 'privateKey',
        }),
      };
    }

    throw new UnauthorizedException();
  }
}
