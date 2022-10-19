import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly service: LocationService) {
    // this.service.findAll().then((data) => {
    //   console.log(data);
    // });
  }

  @Get()
  // @HttpCode(HttpStatus.FOUND)
  async findAllLocations() {
    return await this.service.findAll();
  }
}
