import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerManagementComponent } from './influencer-management.component';

describe('InfluencerManagementComponent', () => {
  let component: InfluencerManagementComponent;
  let fixture: ComponentFixture<InfluencerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
