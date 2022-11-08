import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';
import { MatDialog } from '@angular/material/dialog';
import { LayerToggleComponent } from '../dialogs/layer-toggle/layer-toggle.component';
import { LayersRepository } from '../state';
import { DTMapService } from '../map.service';

@Component({
  selector: 'uwmh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  geojson_layers$ = this.layers.geojson_layers$;
  custom_3d_layers$ = this.layers.custom_3d_layers$;
  layers_visibility$ = this.layers.layer_visibility_change$;
  map: Map | undefined;
  mapSubject$ = this.mapService.mapSubject;
  constructor(
    private mapService: DTMapService,
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
  @Input() antialias = true;
  @Input() navigationControl = true;
  @Input() fullscreenControl = true;
  @Input() scaleControl = true;
  @Output() mapEvent = new EventEmitter<Map>();
  mapStyle = 'streets';

  ngOnInit() {
    this.mapSubject$.subscribe((map) => {
      if (map) {
        this.map = map;

        this.layers_visibility$.subscribe(() => {
          const s = this.geojson_layers$.subscribe((layers$) => {
            layers$.forEach((layer$) => {
              const s = layer$.subscribe((layer) => {
                const layer_id = layer.id;
                map.setLayoutProperty(
                  layer_id,
                  'visibility',
                  layer.layout_visibility ? 'visible' : 'none'
                );
              });
              s.unsubscribe();
            });
          });
          s.unsubscribe();
        });
      }
    });
  }

  onMapLoad(map: Map) {
    this.mapEvent.emit(map);
  }

  toggleLayers() {
    const dialogRef = this.dialog.open(LayerToggleComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    //   this.layers.set_layer_visibility('boundary_line', result[0]);
    //   this.layers.set_layer_visibility('boundary_fill', result[1]);
    //   this.layers.set_layer_visibility('rivers', result[2]);
    //   // this.service.show_layers();
    // });
  }

  streets() {
    this.map?.setStyle(
      'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs'
    );
  }

  satelite() {
    this.map?.setStyle('mapbox://styles/mapbox/satellite-streets-v11');
  }

  outdoors() {
    this.map?.setStyle('mapbox://styles/mapbox/outdoors-v11');
  }
}
