import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  setEntities,
  selectAllEntities,
} from '@ngneat/elf-entities';
import { PNPLC } from '../interfaces';
import { map } from 'rxjs';
import { BackendService } from './backend.service';

const store = createStore({ name: 'pnplc' }, withEntities<PNPLC>());

@Injectable({ providedIn: 'root' })
export class PNPLCEntities {
  allEntities$ = store.pipe(selectAllEntities());
  values$ = store.pipe(
    selectAllEntities(),
    map((e) =>
      e.map((item) => [
        item.col3,
        item.col4,
        item.col5,
        item.col6,
        item.col7,
        item.col8,
        item.col9,
        item.col10,
        item.col11,
      ])
    )
  );
  ts$ = store.pipe(
    selectAllEntities(),
    map((e) => e.map((item) => item.ts))
  );
  constructor(private backend: BackendService) {
    this.backend.getPNPLCEntities().subscribe((values) => {
      store.update(setEntities(values));
    });
  }
}
