import { Component, OnInit } from '@angular/core';
import { BoundaryEffects, BoundaryRepository } from '@uwmh/state';
import { dispatch } from '@ngneat/effects';

@Component({
  templateUrl: './attica-region-boundary.component.html',
  styleUrls: ['./attica-region-boundary.component.css'],
})
export class AtticaRegionBoundaryComponent implements OnInit {
  attica_region$ = this.repository.attica_region$;
  load_attica_region = this.effects.loadAtticaRegionAction;
  dispatch = dispatch;
  features$ = Array(this.attica_region$);
  constructor(
    private repository: BoundaryRepository,
    private effects: BoundaryEffects
  ) {}

  ngOnInit(): void {
    this.dispatch(this.load_attica_region());
  }
}
