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

  generateJwt(payload: UserDTO): string {
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }

  async signIn(userDTO: UserDTO) {
    if (!userDTO) throw new BadRequestException('Unauthenticated');

    const user = await this.findUserByEmail(userDTO.email);
    // if (!user) return this.registerUser(userDTO);

    return this.generateJwt({ ...user });
  }

  async registerUser(user: UserDTO) {
    const createdUser = await this.userModel.create(user);
    return this.generateJwt({ ...createdUser });
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return user as UserDTO;
  }
}
