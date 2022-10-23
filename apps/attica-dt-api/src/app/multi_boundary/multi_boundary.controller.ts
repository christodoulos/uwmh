import { Controller, Get, Param } from '@nestjs/common';
import { MultiBoundaryService } from './multi_boundary.service';

@Controller('multiboundary')
export class MultiBoundaryController {
  constructor(private readonly service: MultiBoundaryService) {}

  @Get()
  async all() {
    return await this.service.get_all();
  }

  @Get(':desc')
  async by_desc(@Param() params) {
    console.log(params);
    const desc = params.desc;
    return await this.service.get_by_desc(desc);
  }
}
