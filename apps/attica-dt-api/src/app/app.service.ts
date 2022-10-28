import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Attica, AtticaDocument } from './app.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Attica.name)
    private atticaModel: Model<AtticaDocument>
  ) {}

  async getAttica(): Promise<Attica> {
    return this.atticaModel.findOne().exec();
  }
}
