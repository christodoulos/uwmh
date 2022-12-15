import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';

interface UI {
  is_loading: boolean;
}

const UIInit: UI = {
  is_loading: false,
};

const ui = createStore({ name: 'ui' }, withProps<UI>(UIInit));

@Injectable()
export class UIRepository {
  is_loading$ = ui.pipe(select((state) => state.is_loading));

  setIsLoading(is_loading: boolean) {
    ui.update((state) => ({ ...state, is_loading }));
  }
}
