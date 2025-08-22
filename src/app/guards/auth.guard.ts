import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Check if route requires specific role
      if (route.data['role']) {
        const requiredRole = route.data['role'];
        if (!this.authService.hasRole(requiredRole)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }

      // Check if route requires specific permission
      if (route.data['permission']) {
        const requiredPermission = route.data['permission'];
        if (!this.authService.hasPermission(requiredPermission)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }

      return true;
    }

    // Store the attempted URL for redirecting after login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
