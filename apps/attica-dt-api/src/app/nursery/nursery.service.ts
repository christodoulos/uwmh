import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  PNWeatherDocument,
  PNWeather,
  PLCDocument,
  PLC,
  EYDAP_APN_Document,
  EYDAP_APN,
} from './nursery.schema';
import { EYDAP_APN_DTO } from '@uwmh/state';

@Injectable()
export class NurseryService {
  constructor(
    @InjectModel('NurseryWeather')
    private nWeatherModel: Model<PNWeatherDocument>,
    @InjectModel('PLC')
    private plcModel: Model<PLCDocument>,
    @InjectModel('EYDAP-APN')
    private eydapAPNModel: Model<EYDAP_APN_Document>
  ) {}

  // APN PLC

  async plc_get_all(): Promise<PLC[]> {
    return this.plcModel.find().exec();
  }

  async plc_get_latest(): Promise<PLC> {
    return this.plcModel.findOne({}, {}, { sort: { ts: -1 } }).exec();
  }

  // APN WeatherBit

  async get_all(): Promise<PNWeather[]> {
    return this.nWeatherModel.find().exec();
  }

  async get_latest(): Promise<PNWeather> {
    return this.nWeatherModel.findOne({}, {}, { sort: { _id: -1 } }).exec();
  }

  // EYDAP Analyses

  async eydap_apn_analysis_write(analysis: EYDAP_APN_DTO): Promise<EYDAP_APN> {
    return this.eydapAPNModel.create(analysis);
  }
}
