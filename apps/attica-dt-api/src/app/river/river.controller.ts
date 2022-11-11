import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RiverService } from './river.service';

@Controller('river')
export class RiverController {
  constructor(private readonly service: RiverService) {}

  @Get()
  async all() {
    return await this.service.get_all();
  }

  @Get(':id')
  async by_id(@Param() params: { id: string }) {
    const id = params.id;
    return await this.service.get_by_id(id);
  }

  @Post()
  async manyby_id(@Body() ids: string[]) {
    const data = await this.service.getmany_by_id(ids);
    return data;
  }
}
