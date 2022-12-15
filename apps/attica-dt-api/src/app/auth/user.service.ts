import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserDTO } from '@uwmh/state';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDTO: UserDTO) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      const createdUser = new this.userModel(userDTO);
      await createdUser.save();
      return createdUser;
    } else {
      return user;
    }
  }
}
