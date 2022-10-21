import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtticaRegionBoundariesComponent } from './attica-region-boundaries.component';

describe('AtticaRegionComponent', () => {
  let component: AtticaRegionBoundariesComponent;
  let fixture: ComponentFixture<AtticaRegionBoundariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtticaRegionBoundariesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtticaRegionBoundariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
