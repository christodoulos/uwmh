import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MultiBoundaryController } from './multi_boundary.controller';
import { MultiBoundaryService } from './multi_boundary.service';
import {
  MultiBoundary,
  MultiBoudarySchema,
} from './schemas/multi_boundary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MultiBoundary.name, schema: MultiBoudarySchema },
    ]),
  ],
  providers: [MultiBoundaryService],
  controllers: [MultiBoundaryController],
})
export class MultiBoundaryModule {}
