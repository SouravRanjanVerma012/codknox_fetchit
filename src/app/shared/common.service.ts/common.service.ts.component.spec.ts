import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonServiceTsComponent } from './common.service.ts.component';

describe('CommonServiceTsComponent', () => {
  let component: CommonServiceTsComponent;
  let fixture: ComponentFixture<CommonServiceTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonServiceTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonServiceTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
