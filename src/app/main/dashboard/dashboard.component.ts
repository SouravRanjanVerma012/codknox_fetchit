import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { DashboardInvoiceComponent } from './dashboard-invoice/dashboard-invoice.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, DashboardInvoiceComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  currentUser: any;
  token: string | null = null;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  dashboardData: any;
  isAccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
    this.token = this.authService.getToken();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  navigate(path: string): void {
    this.router.navigate([`/main/${path.toLowerCase()}`]);
  }
}
