import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MultilineController } from './multi_line.controller';
import { MultilineService } from './multi_line.service';
import { Multiline, MultiLineSchema } from './schemas/multi_line.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Multiline.name, schema: MultiLineSchema },
    ]),
  ],
  providers: [MultilineService],
  controllers: [MultilineController],
})
export class MultilineModule {}
