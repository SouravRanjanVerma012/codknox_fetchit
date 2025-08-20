import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConstTsComponent } from './common.const.ts.component';

describe('CommonConstTsComponent', () => {
  let component: CommonConstTsComponent;
  let fixture: ComponentFixture<CommonConstTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonConstTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonConstTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
