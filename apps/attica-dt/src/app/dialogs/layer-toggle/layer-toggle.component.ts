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

  async ngOnInit() {
    zip(
      this.layers.is_layer_visible('attica-region-boundary-line'),
      this.layers.is_layer_visible('attica-region-boundary-fill'),
      this.layers.is_layer_visible('attica-perfecture-rivers')
    ).subscribe((values) => {
      this.bl = values[0];
      this.bf = values[1];
      this.br = values[2];
    });
  }

  onToggleChange(layer_id: string) {
    // prettier-ignore
    switch (layer_id) {
      case 'attica-region-boundary-line':
        this.bl = !this.bl
        this.layers.set_layer_visibility('attica-region-boundary-line', this.bl );
        break;
      case 'attica-region-boundary-fill':
        this.bf = !this.bf
        this.layers.set_layer_visibility('attica-region-boundary-fill', this.bf );
        break;
      case 'attica-perfecture-rivers':
        this.br = !this.br
        this.layers.set_layer_visibility('attica-perfecture-rivers', this.br );
        break;
      default:
        break;
    }
  }
}
