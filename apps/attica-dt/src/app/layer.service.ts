import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { LayersRepository, Layer } from './state';

@Injectable({
  providedIn: 'root',
})
export class LayerService {
  map = this.service.map;
  layers: Observable<Layer>[] = [
    this.attica.boundary_line$,
    this.attica.boundary_fill$,
    this.attica.rivers$,
  ];
  constructor(private attica: LayersRepository, private service: AppService) {}
}
