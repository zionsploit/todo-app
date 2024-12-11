import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInfo, ResponseUserDto } from 'dto/userDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  signIn(@Body() requestData: LoginInfo): Promise<ResponseUserDto> {
    return this.authService.signIn(requestData);
  }
}
