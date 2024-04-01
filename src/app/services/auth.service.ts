import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken, LoginAuth } from '../models/auth.model';
import { User } from '../models/user.model';

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

  getProfileInfo(token: string) {
    /*
    // si se quisiera hacer dinámico, se usa HttpHeaders
    const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    */

    // Esta es otra forma de enviar los headers
    return this.authServices.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
