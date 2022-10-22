import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
  declarations: [MapComponent, LayerComponent],
  exports: [MapComponent, LayerComponent],
})
export class MapboxModule {}
