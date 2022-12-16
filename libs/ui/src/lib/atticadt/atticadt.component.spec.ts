import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtticadtComponent } from './atticadt.component';

describe('AtticadtComponent', () => {
  let component: AtticadtComponent;
  let fixture: ComponentFixture<AtticadtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtticadtComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtticadtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
