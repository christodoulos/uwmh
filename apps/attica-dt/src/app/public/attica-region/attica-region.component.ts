import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as geojson from 'geojson';

@Component({
  selector: 'uwmh-attica-region',
  templateUrl: './attica-region.component.html',
  styleUrls: ['./attica-region.component.css'],
})
export class AtticaRegionComponent implements OnInit {
  data: geojson.Feature | undefined;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<geojson.Feature[]>('/api/location').subscribe({
      next: (data) => {
        console.log(data);
        this.data = data[0] as geojson.Feature;
        console.log(this.data);
      },
    });
  }
}
