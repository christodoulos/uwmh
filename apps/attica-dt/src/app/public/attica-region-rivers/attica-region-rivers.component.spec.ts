import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtticaRegionRiversComponent } from './attica-region-rivers.component';

describe('AtticaRegionRiversComponent', () => {
  let component: AtticaRegionRiversComponent;
  let fixture: ComponentFixture<AtticaRegionRiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtticaRegionRiversComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtticaRegionRiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
