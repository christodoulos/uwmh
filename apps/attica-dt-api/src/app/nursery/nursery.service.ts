import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  PNWeatherDocument,
  PNWeather,
  PLCDocument,
  PLC,
} from './nursery.schema';

@Injectable()
export class NurseryService {
  constructor(
    @InjectModel('NurseryWeather')
    private nWeatherModel: Model<PNWeatherDocument>,
    @InjectModel('PLC')
    private plcModel: Model<PLCDocument>
  ) {}

  async plc_get_all(): Promise<PLC[]> {
    return this.plcModel.find().exec();
  }

  async plc_get_latest(): Promise<PLC> {
    return this.plcModel.findOne({}, {}, { sort: { ts: -1 } }).exec();
  }

  async get_all(): Promise<PNWeather[]> {
    return this.nWeatherModel.find().exec();
  }

  async get_latest(): Promise<PNWeather> {
    return this.nWeatherModel.findOne({}, {}, { sort: { _id: -1 } }).exec();
  }
}
