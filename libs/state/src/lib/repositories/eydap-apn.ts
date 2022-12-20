import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  setEntities,
  selectAllEntities,
  addEntities,
} from '@ngneat/elf-entities';
import { EYDAP_APN } from '../interfaces';
import { BackendService } from './backend.service';

const store = createStore(
  { name: 'eydap-apn-analyses' },
  withEntities<EYDAP_APN>()
);

@Injectable({ providedIn: 'root' })
export class EYDAP_APN_ANALYSES_Entities {
  constructor(private backend: BackendService) {}

  addAnalysis(analysis: EYDAP_APN) {
    store.update(addEntities(analysis));
  }
}
