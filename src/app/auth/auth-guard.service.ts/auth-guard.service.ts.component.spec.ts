import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuardServiceTsComponent } from './auth-guard.service.ts.component';

describe('AuthGuardServiceTsComponent', () => {
  let component: AuthGuardServiceTsComponent;
  let fixture: ComponentFixture<AuthGuardServiceTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGuardServiceTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGuardServiceTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
