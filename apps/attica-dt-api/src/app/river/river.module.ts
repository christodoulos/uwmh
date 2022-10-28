import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiverController } from './river.controller';
import { RiverService } from './river.service';
import { River, RiverSchema } from './river.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: River.name,
        schema: RiverSchema,
      },
    ]),
  ],
  controllers: [RiverController],
  providers: [RiverService],
})
export class RiverModule {}
