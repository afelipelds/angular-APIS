import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/v1/users`;

  constructor(private usersServices: HttpClient) {}

  createUser(dto: CreateUserDTO) {
    return this.usersServices.post<User>(this.apiUrl, dto);
  }

  getAllUsers() {
    return this.usersServices.get<User[]>(this.apiUrl);
  }
}
