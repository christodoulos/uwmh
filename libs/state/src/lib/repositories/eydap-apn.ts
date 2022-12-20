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
  allEntities$ = store.pipe(selectAllEntities());
  constructor(private backend: BackendService) {}

  async getAnalyses() {
    this.backend.getEYDAPAPNAnalyses().subscribe((values) => {
      console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOO', values);
      store.update(addEntities(values));
    });
  }

  async addAnalysis(analysis: EYDAP_APN) {
    this.backend.writeEYDAPAnalysis(analysis).subscribe((value) => {
      store.update(addEntities(value));
    });
  }
}
