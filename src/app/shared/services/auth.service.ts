import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LoginRequest, LoginResponse, User, AuthState, RefreshTokenRequest } from '../models/auth.models';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';
  private platformId = inject(PLATFORM_ID);

  // Demo admin credentials
  private readonly DEMO_ADMIN = {
    email: 'admin@fetchit.com',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@fetchit.com',
      name: 'Admin User',
      role: 'admin',
      permissions: ['dashboard', 'user_management', 'settings', 'reports']
    }
  };

  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {
    this.initializeAuthState();
  }

  // Initialize auth state from localStorage
  private initializeAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip localStorage access during SSR
    }

    const token = localStorage.getItem(this.TOKEN_KEY);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);

    if (token && !this.jwtService.isTokenExpired(token)) {
      const user = userData ? JSON.parse(userData) : null;
      this.updateAuthState({
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      this.clearAuthData();
    }
  }

  // Login method with demo authentication
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    
    // Simulate API call delay
    return of(this.validateDemoCredentials(credentials)).pipe(
      delay(1000), // Simulate network delay
      map(response => {
        if (response) {
          this.handleLoginSuccess(response);
          return response;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  // Validate demo credentials
  private validateDemoCredentials(credentials: LoginRequest): LoginResponse | null {
    if (credentials.email === this.DEMO_ADMIN.email && 
        credentials.password === this.DEMO_ADMIN.password) {
      
      // Generate a mock JWT token (in real app, this would come from server)
      const mockToken = this.generateMockToken(this.DEMO_ADMIN.user);
      const mockRefreshToken = this.generateMockRefreshToken();
      
      return {
        token: mockToken,
        refreshToken: mockRefreshToken,
        user: this.DEMO_ADMIN.user,
        expiresIn: 3600 // 1 hour
      };
    }
    return null;
  }

  // Generate mock JWT token (for demo purposes)
  private generateMockToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  // Generate mock refresh token
  private generateMockRefreshToken(): string {
    return 'mock-refresh-token-' + Date.now();
  }

  // Handle successful login
  private handleLoginSuccess(response: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }

    this.updateAuthState({
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken,
      isAuthenticated: true,
      isLoading: false
    });

    this.router.navigate(['/main/dashboard']);
  }

  // Refresh token (mock implementation)
  refreshToken(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('No refresh token available'));
    }

    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // Simulate token refresh
    return of({
      token: this.generateMockToken(this.DEMO_ADMIN.user),
      refreshToken: this.generateMockRefreshToken(),
      user: this.DEMO_ADMIN.user,
      expiresIn: 3600
    }).pipe(
      delay(500),
      tap(response => {
        this.handleLoginSuccess(response);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  // Logout method
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // Clear all authentication data
  private clearAuthData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    
    this.updateAuthState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false
    });
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  // Get current token
  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtService.isTokenExpired(token) : false;
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions?.includes(permission) || false;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Get demo credentials for display
  getDemoCredentials(): { email: string; password: string } {
    return {
      email: this.DEMO_ADMIN.email,
      password: this.DEMO_ADMIN.password
    };
  }

  // Set loading state
  private setLoading(isLoading: boolean): void {
    const currentState = this.authStateSubject.value;
    this.updateAuthState({ ...currentState, isLoading });
  }

  // Update auth state
  private updateAuthState(state: AuthState): void {
    this.authStateSubject.next(state);
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.statusText;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
