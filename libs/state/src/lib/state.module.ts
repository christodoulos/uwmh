import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BackendService } from './backend.service';

import { SourcesRepository } from './sources';
import { LayersRepository } from './layers';
import { UIRepository } from './ui';
import { MapWhereRepository } from './mapwhere';
import { DrawnFeaturesRepository } from './draw';
import { UserRepository } from './user';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    BackendService,
    SourcesRepository,
    LayersRepository,
    UIRepository,
    MapWhereRepository,
    DrawnFeaturesRepository,
    UserRepository,
  ],
})
export class StateModule {}
