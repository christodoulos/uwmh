import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { lastValueFrom, map, mergeMap, tap } from 'rxjs';
import { BackendService } from '../backend.service';
import { MapSources, sourcesInit } from '@uwmh/data';

const atticaSources = createStore(
  { name: 'sources' },
  withProps<MapSources>(sourcesInit)
);

@Injectable()
export class SourcesRepository {
  constructor(private backend: BackendService) {}

  attica_boundary$ = atticaSources.pipe(
    select((state) => state['attica-boundary'])
  );
  attica_rivers$ = atticaSources.pipe(
    select((state) => state['attica-rivers'])
  );

  async updateAll() {
    return await Promise.all([
      this.updateAtticaBoundary(),
      this.updateAtticaRivers(),
    ]);
  }

  async updateAtticaBoundary() {
    return await lastValueFrom(
      this.backend.getAtticaIndex().pipe(
        map((data) => {
          console.log('ATTICA INDEX>', data);
          return data.boundary;
        }),
        mergeMap((id) => {
          console.log('BOUNDARY DATA ID>', id);
          return this.backend.getBoundary(id);
        }),
        map((boundary) => {
          console.log('BOUNDARY DATA>', boundary);
          return {
            'attica-boundary': {
              id: 'attica-boundary',
              data: boundary.geometry,
            },
          };
        }),
        tap((boundary) =>
          atticaSources.update((state) => ({ ...state, ...boundary }))
        )
      )
    );
  }

  async updateAtticaRivers() {
    return await lastValueFrom(
      this.backend.getAtticaIndex().pipe(
        map((data) => {
          console.log('ATTICA INDEX>', data);
          return data.rivers;
        }),
        mergeMap((ids) => {
          console.log('RIVERS IDS>', ids);
          return this.backend.getRivers(ids);
        }),
        map(
          (
            rivers // converts to FeatureCollection features
          ) => {
            console.log('ATTICA RIVERS>', rivers);
            return rivers.map((river) => ({
              type: river.type,
              geometry: river.geometry,
              properties: river.properties,
            }));
          }
        ),
        map((rivers) => ({
          'attica-rivers': {
            id: 'attica-rivers',
            data: { type: 'FeatureCollection' as const, features: [...rivers] },
          },
        })),
        tap((rivers) =>
          atticaSources.update((state) => ({ ...state, ...rivers }))
        )
      )
    );
  }
}
