import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent {
  sidebarOpen: boolean = false; // Start closed

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.sidebarOpen = false;
      });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
