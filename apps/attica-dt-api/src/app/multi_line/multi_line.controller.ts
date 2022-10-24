import { Controller, Get } from '@nestjs/common';
import { MultilineService } from './multi_line.service';

@Controller('multiline')
export class MultilineController {
  constructor(private readonly service: MultilineService) {
    // this.get_rivers().then((data) => console.log(data));
  }

  @Get('rivers')
  async get_rivers() {
    return await this.service.get_rivers();
  }
}
