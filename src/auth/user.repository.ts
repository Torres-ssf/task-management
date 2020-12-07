import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  salt: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createNewUser({
    name,
    email,
    password,
    salt,
  }: CreateUserParams): Promise<User> {
    const user = this.create({
      name,
      email,
      password,
      salt,
    });

    return this.save(user);
  }
}
