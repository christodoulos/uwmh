import { Controller, Get, Param } from '@nestjs/common';
import { BoundaryService } from './boundary.service';

@Controller('boundary')
export class BoundaryController {
  constructor(private readonly service: BoundaryService) {}

  @Get()
  async all() {
    return await this.service.get_all();
  }

  @Get(':id')
  async by_id(@Param() params) {
    const id = params.id;
    return await this.service.get_by_id(id);
  }
}
