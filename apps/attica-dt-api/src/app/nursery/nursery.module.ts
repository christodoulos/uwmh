import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NurseryController } from './nursery.controller';
import { EYDAP_APN_Schema, PLCSchema, PNWeatherSchema } from './nursery.schema';
import { NurseryService } from './nursery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NurseryWeather', schema: PNWeatherSchema },
    ]),
    MongooseModule.forFeature([{ name: 'PLC', schema: PLCSchema }]),
    MongooseModule.forFeature([
      { name: 'EYDAP-APN', schema: EYDAP_APN_Schema },
    ]),
  ],
  controllers: [NurseryController],
  providers: [NurseryService],
})
export class NurseryModule {}
