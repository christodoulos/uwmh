import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@uwmh/material';

import { NgxEchartsModule } from 'ngx-echarts';

import { WeatherbitInfoComponent } from './weatherbit-info/weatherbit-info.component';
import { PlantNurseryPlcComponent } from './plant-nursery-plc/plant-nursery-plc.component';

// import { PNWeatherRepository } from './state/pnweather';
// import { PNPLCEntities } from './state/pnplc';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [
    WeatherbitInfoComponent,
    PlantNurseryPlcComponent,
    LinePlotComponent,
    AvatarMenuComponent,
  ],
  exports: [
    WeatherbitInfoComponent,
    PlantNurseryPlcComponent,
    LinePlotComponent,
    AvatarMenuComponent,
  ],
  // providers: [PNWeatherRepository, PNPLCEntities],
})
export class UiModule {}
