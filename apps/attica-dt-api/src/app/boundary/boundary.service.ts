import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Boundary, BoundaryDocument } from './boundary.schema';

@Injectable()
export class BoundaryService {
  constructor(
    @InjectModel(Boundary.name)
    private boundaryModel: Model<BoundaryDocument>
  ) {}

  async get_all(): Promise<Boundary[]> {
    return this.boundaryModel.find().exec();
  }

  async get_by_id(id: string): Promise<Boundary> {
    return this.boundaryModel.findById(id).exec();
  }
}
