import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDTO } from '@uwmh/data';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  generateJwt(payload: UserDTO) {
    return this.jwtService.sign(payload);
  }

  async signIn(userDTO: UserDTO) {
    if (!userDTO) throw new BadRequestException('Unauthenticated');

    const user = await this.findUserByEmail(userDTO.email);
    // if (!user) return this.registerUser(userDTO);

    return this.generateJwt({ ...user });
  }

  async registerUser(u: UserDTO) {
    const user = await this.userModel.create({
      provider: 'google',
      providerId: 'aa',
      ...u,
    });
    return this.generateJwt({ ...user });
    // try {
    //   const user = await this.userModel.create(userDTO);
    //   return this.generateJwt(user);
    // } catch {
    //   throw new InternalServerErrorException();
    // }
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return user as UserDTO;
  }
}
