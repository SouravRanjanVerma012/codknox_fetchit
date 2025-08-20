import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkServiceTsComponent } from './network.service.ts.component';

describe('NetworkServiceTsComponent', () => {
  let component: NetworkServiceTsComponent;
  let fixture: ComponentFixture<NetworkServiceTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkServiceTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkServiceTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
