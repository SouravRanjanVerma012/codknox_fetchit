import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapManagementComponent } from './map-management.component';

describe('MapManagementComponent', () => {
  let component: MapManagementComponent;
  let fixture: ComponentFixture<MapManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
