import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { genSalt, hash } from 'bcrypt';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentials: SignUpCredentialsDto): Promise<User> {
    const { name, email, password } = authCredentials;

    const userExists = await this.userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('Email already taken');
    }

    const salt = await genSalt();

    const hashedPassword = await hash(password, salt);

    try {
      const user = await this.userRepository.createNewUser({
        name,
        email,
        password: hashedPassword,
        salt,
      });

      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        'Unexpected erro when trying to create new user',
      );
    }
  }
}
