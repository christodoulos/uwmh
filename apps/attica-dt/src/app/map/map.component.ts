import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { LayerToggleComponent } from '../dialogs/layer-toggle/layer-toggle.component';
import { LayersRepository } from '../state';

@Component({
  selector: 'uwmh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  constructor(
    private service: AppService,
    private dialog: MatDialog,
    private layers: LayersRepository
  ) {}
  @Input() style = 'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs';
  @Input() bounds: LngLatBoundsLike = [
    [24.116494, 38.340999],
    [22.890434, 35.823757],
  ];
  @Input() center: LngLatLike = [23.600814, 37.840158];
  @Input() pitch = [0] as [number];
  @Input() navigationControl = true;
  @Input() fullscreenControl = true;
  @Input() scaleControl = true;
  @Output() map = new EventEmitter<Map>();
  mapStyle = 'streets';

  onMapLoad(map: Map) {
    this.map.emit(map);
  }

  toggleLayers() {
    const dialogRef = this.dialog.open(LayerToggleComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.layers.set_layer_visibility('boundary_line', result[0]);
      this.layers.set_layer_visibility('boundary_fill', result[1]);
      this.layers.set_layer_visibility('rivers', result[2]);
      this.service.show_layers();
    });
  }

  streets() {
    this.service.map.setStyle(
      'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs'
    );
  }

  satelite() {
    this.service.map.setStyle('mapbox://styles/mapbox/satellite-streets-v11');
  }

  outdoors() {
    this.service.map.setStyle('mapbox://styles/mapbox/outdoors-v11');
  }
}
