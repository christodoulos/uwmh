import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoundaryController } from './boundary.controller';
import { BoundaryService } from './boundary.service';
import { Boundary, BoundarySchema } from './boundary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Boundary.name,
        schema: BoundarySchema,
      },
    ]),
  ],
  controllers: [BoundaryController],
  providers: [BoundaryService],
})
export class BoundaryModule {}
