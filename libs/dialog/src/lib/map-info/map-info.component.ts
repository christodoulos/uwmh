import { Component } from '@angular/core';
import { PNPLCEntities } from '@uwmh/state';

@Component({
  selector: 'uwmh-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss'],
})
export class MapInfoComponent {
  ts$ = this.pnplc.ts$;
  values$ = this.pnplc.values$;
  selection = -1;
  constructor(private pnplc: PNPLCEntities) {}
}
