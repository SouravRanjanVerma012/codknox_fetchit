import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent]
})
export class LoginComponent implements OnInit {
  LoginFlag: boolean = true;
  loginForm: FormGroup;
  resetForm: FormGroup;
  show: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  demoCredentials: { email: string; password: string };

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
      password: new FormControl('', Validators.required)
    });

    this.resetForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")])
    });

    this.demoCredentials = this.authService.getDemoCredentials();
  }

  ngOnInit(): void {
    // Subscribe to auth state to show loading
    this.authService.authState$.subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      
      const credentials: LoginRequest = {
        email: this.loginForm.get('userName')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }

  password(): void {
    this.show = !this.show;
  }

  navigatePassword(): void {
    this.LoginFlag = !this.LoginFlag;
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      console.log('Password reset attempt:', this.resetForm.value);
      // Implement password reset logic here
    }
  }

  // Auto-fill demo credentials
  fillDemoCredentials(): void {
    this.loginForm.patchValue({
      userName: this.demoCredentials.email,
      password: this.demoCredentials.password
    });
  }
}
