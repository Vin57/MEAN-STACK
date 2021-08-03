import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user.model';
import { JwtToken } from '../models/class/jwt-token.model';
import { JWTTokenFactory } from '../models/factories/jwt-token.factory';

export const API_URL = '/api';
export const JWT_LOCALE_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token$: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null,
  });
  constructor(private http: HttpClient) {
    this.initToken();
  }

  private initToken(): void {
    const token = localStorage.getItem(JWT_LOCALE_KEY);
    this.token$.next(JWTTokenFactory.build(token != undefined, token));
  }

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, user);
  }

  signin(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(`${API_URL}/auth/signin`, credentials).pipe(
      tap((token: string) => {
        this.token$.next(JWTTokenFactory.build(true, token));
        localStorage.setItem(JWT_LOCALE_KEY, token);
      }),
      map((token: string) => token)
    );
  }

  logout(): void {
    // Send empty token into BehaviorSubject
    this.token$.next(JWTTokenFactory.build());
    // Remove jwt from localStorage
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(map((token: JwtToken) => token.isAuthenticated));
  }
}
