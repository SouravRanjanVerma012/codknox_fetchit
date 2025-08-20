import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantServiceComponent } from './merchant-service.component';

describe('MerchantServiceComponent', () => {
  let component: MerchantServiceComponent;
  let fixture: ComponentFixture<MerchantServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
