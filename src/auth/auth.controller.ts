import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ): Promise<User> {
    const user = await this.authService.signUp(authCredentials);

    return classToClass(user);
  }
}
