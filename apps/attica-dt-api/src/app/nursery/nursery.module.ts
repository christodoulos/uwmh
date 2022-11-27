import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NurseryController } from './nursery.controller';
import { PLCSchema, PNWeatherSchema } from './nursery.schema';
import { NurseryService } from './nursery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NurseryWeather', schema: PNWeatherSchema },
    ]),
    MongooseModule.forFeature([{ name: 'PLC', schema: PLCSchema }]),
  ],
  controllers: [NurseryController],
  providers: [NurseryService],
})
export class NurseryModule {}
