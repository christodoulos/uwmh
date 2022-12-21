import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  updateEntities,
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
      store.update(addEntities(values));
    });
  }

  async addAnalysis(analysis: EYDAP_APN) {
    this.backend.writeEYDAPAnalysis(analysis).subscribe((value) => {
      store.update(addEntities(value));
    });
  }

  async updateAnalysis(analysis: EYDAP_APN) {
    this.backend.updateEYDAPAnalysis(analysis).subscribe((value) => {
      store.update(
        // BE CAREFUL: value is the document before update
        updateEntities(value.id, (entity) => ({ ...entity, ...analysis }))
      );
    });
  }
}
