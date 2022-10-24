import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Multiline, MultilineDocument } from './schemas/multi_line.schema';

@Injectable()
export class MultilineService {
  constructor(
    @InjectModel(Multiline.name)
    private multilineModel: Model<MultilineDocument>
  ) {}

  async get_rivers(): Promise<Multiline[]> {
    return this.multilineModel.find({ type: 'river' }).exec();
  }
}
