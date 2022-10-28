import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { River, RiverDocument } from './river.schema';

@Injectable()
export class RiverService {
  constructor(
    @InjectModel(River.name)
    private riverModel: Model<RiverDocument>
  ) {}

  async get_all(): Promise<River[]> {
    return this.riverModel.find().exec();
  }

  async get_by_id(id: string): Promise<River> {
    return this.riverModel.findById(id).exec();
  }

  async getmany_by_id(ids: string[]): Promise<River[]> {
    return this.riverModel.find({ _id: { $in: ids } }).exec();
  }
}
