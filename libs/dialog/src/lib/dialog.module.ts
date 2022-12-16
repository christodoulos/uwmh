import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@uwmh/material';
// import { UiModule } from '@uwmh/ui';
import { NgxEchartsModule } from 'ngx-echarts';

import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LayerToggleComponent } from './layer-toggle/layer-toggle.component';
import { MapInfoComponent } from './map-info/map-info.component';
import { DrawnGeoJsonComponent } from './drawn-geo-json/drawn-geo-json.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WeatherbitInfoComponent } from './weatherbit-info/weatherbit-info.component';
import { PlantNurseryPlcComponent } from './plant-nursery-plc/plant-nursery-plc.component';
import { LinePlotComponent } from './line-plot/line-plot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
    WeatherbitInfoComponent,
    PlantNurseryPlcComponent,
    LinePlotComponent,
  ],
  exports: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
    LinePlotComponent,
  ],
})
export class DialogModule {}
