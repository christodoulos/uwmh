import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';

import { Injectable } from '@angular/core';

interface DTEvents {
  show_attica_region_boundaries: boolean;
  show_plant_nursery_location: boolean;
}

export const InitDTEvents = {
  show_attica_region_boundaries: false,
  show_plant_nursery_location: false,
};

const { state, config } = createState(withProps<DTEvents>(InitDTEvents));

const store = new Store({ state, name: 'events', config });

@Injectable({ providedIn: 'root' })
export class EventEffects {
  show_attica_region_boundaries_Action = createAction('k');
}
