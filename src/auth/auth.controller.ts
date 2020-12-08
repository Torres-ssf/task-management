import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signUp(
    @Body(ValidationPipe) authCredentials: SignUpCredentialsDto,
  ): Promise<User> {
    const user = await this.authService.signUp(authCredentials);

    return classToClass(user);
  }
}
