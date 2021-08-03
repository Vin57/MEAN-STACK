import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { JwtToken } from '../models/jwt-token.model';

const API_URL = '/api';
const JWT_LOCALE_KEY = 'jwt';

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
    this.token$.next({
      isAuthenticated: token ? true : false,
      token: token ?? null,
    });
  }

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, user);
  }

  signin(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post<string>(`${API_URL}/auth/signin`, credentials).pipe(
      tap((token: string) => {
        this.token$.next({
          isAuthenticated: true,
          token: token,
        });
        localStorage.setItem(JWT_LOCALE_KEY, token);
      }),
      map((token: string) => token)
    );
  }
}
