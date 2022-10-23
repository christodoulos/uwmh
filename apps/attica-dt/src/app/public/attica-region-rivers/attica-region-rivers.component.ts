import { Component, OnInit } from '@angular/core';
// import { BoundariesEffects, BoundariesRepository } from '@uwmh/state';
import { dispatch } from '@ngneat/effects';

@Component({
  selector: 'uwmh-attica-region-rivers',
  templateUrl: './attica-region-rivers.component.html',
  styleUrls: ['./attica-region-rivers.component.css'],
})
export class AtticaRegionRiversComponent implements OnInit {
  // loadAtticaRegionAction = this.effects.loadAtticaRegionAction;
  // attica$ = this.repo.attica_region$;
  // dispatch = dispatch;
  constructor() // private repo: BoundariesRepository,
  // private effects: BoundariesEffects
  {}

  ngOnInit(): void {
    // this.dispatch(this.loadAtticaRegionAction());
  }
}
