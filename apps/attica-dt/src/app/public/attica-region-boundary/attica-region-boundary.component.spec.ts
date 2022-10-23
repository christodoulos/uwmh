import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtticaRegionBoundaryComponent } from './attica-region-boundary.component';

describe('AtticaRegionComponent', () => {
  let component: AtticaRegionBoundaryComponent;
  let fixture: ComponentFixture<AtticaRegionBoundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtticaRegionBoundaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtticaRegionBoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
