import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  // Decode JWT token
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode(token) as DecodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  // Get token expiration time
  getTokenExpirationTime(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded) return null;
    
    return new Date(decoded.exp * 1000);
  }

  // Get time until token expires (in seconds)
  getTimeUntilExpiration(token: string): number {
    const decoded = this.decodeToken(token);
    if (!decoded) return 0;
    
    const currentTime = Date.now() / 1000;
    return Math.max(0, decoded.exp - currentTime);
  }
}
