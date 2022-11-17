import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PNWeatherDocument, PNWeather } from './nursery.schema';

@Injectable()
export class NurseryService {
  constructor(
    @InjectModel('NurseryWeather')
    private nWeatherModel: Model<PNWeatherDocument>
  ) {}

  async get_all(): Promise<PNWeather[]> {
    return this.nWeatherModel.find().exec();
  }
}
