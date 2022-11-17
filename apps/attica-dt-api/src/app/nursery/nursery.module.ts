import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NurseryController } from './nursery.controller';
import { PNWeatherSchema } from './nursery.schema';
import { NurseryService } from './nursery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NurseryWeather', schema: PNWeatherSchema },
    ]),
  ],
  controllers: [NurseryController],
  providers: [NurseryService],
})
export class NurseryModule {}
