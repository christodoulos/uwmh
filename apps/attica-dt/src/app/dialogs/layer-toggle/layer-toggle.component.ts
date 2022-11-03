import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { map, zip } from 'rxjs';
import { LayersRepository } from '../../state';

@Component({
  selector: 'uwmh-layer-toggle',
  templateUrl: './layer-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerToggleComponent implements OnInit {
  bl = false;
  bf = false;
  br = false;
  constructor(private layers: LayersRepository) {}
  boundary_line$ = this.layers.boundary_line$;
  boundary_fill$ = this.layers.boundary_fill$;
  boundary_rivers$ = this.layers.rivers$;

  ngOnInit(): void {
    zip(this.boundary_line$, this.boundary_fill$, this.boundary_rivers$)
      .pipe(map((layers) => layers.map((l) => l.visible)))
      .subscribe((layers) => {
        this.bl = layers[0];
        this.bf = layers[1];
        this.br = layers[2];
      });
  }
}
