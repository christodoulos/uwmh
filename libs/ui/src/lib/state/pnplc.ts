import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  setEntities,
  getAllEntities,
  selectAllEntities,
} from '@ngneat/elf-entities';
import { PNPLC } from '@uwmh/data';
import { map } from 'rxjs';
import { UiBackendService } from './backend.service';

const store = createStore({ name: 'pnplc' }, withEntities<PNPLC>());

@Injectable({ providedIn: 'root' })
export class PNPLCEntities {
  allEntities$ = store.pipe(selectAllEntities());
  constructor(private backend: UiBackendService) {
    this.backend.getPNPLCEntities().subscribe((values) => {
      store.update(setEntities(values));
    });
  }
}
