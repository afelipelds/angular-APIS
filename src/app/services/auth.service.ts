import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { AuthToken, LoginAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1/auth`;

  constructor(private authServices: HttpClient) {}

  login(credentials: LoginAuth) {
    return this.authServices.post<AuthToken>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  getProfileInfo() {
    return this.authServices.get(`${this.apiUrl}/profile`);
  }
}
