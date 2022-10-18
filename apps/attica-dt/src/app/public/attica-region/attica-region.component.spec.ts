import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtticaRegionComponent } from './attica-region.component';

describe('AtticaRegionComponent', () => {
  let component: AtticaRegionComponent;
  let fixture: ComponentFixture<AtticaRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtticaRegionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtticaRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
