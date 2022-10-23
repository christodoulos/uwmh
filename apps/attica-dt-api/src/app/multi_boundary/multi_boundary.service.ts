import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MultiBoundary,
  MultiBoundaryDocument,
} from './schemas/multi_boundary.schema';

@Injectable()
export class MultiBoundaryService {
  constructor(
    @InjectModel(MultiBoundary.name)
    private multiboundaryModel: Model<MultiBoundaryDocument>
  ) {}

  async get_all(): Promise<MultiBoundary[]> {
    return this.multiboundaryModel.find().exec();
  }

  async get_by_desc(desc: string): Promise<MultiBoundary> {
    return this.multiboundaryModel.findOne({ desc }).exec();
  }
}
