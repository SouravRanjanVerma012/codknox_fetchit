import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissonGuardTsComponent } from './permisson.guard.ts.component';

describe('PermissonGuardTsComponent', () => {
  let component: PermissonGuardTsComponent;
  let fixture: ComponentFixture<PermissonGuardTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissonGuardTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissonGuardTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
