import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  token = '';
  counter = 0;
  userCredentials = {
    email: 'jaya@catch.me',
    password: 'ImJayaTheCat',
  };
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authServices: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginUser() {
    this.authServices.login(this.userCredentials).subscribe((res) => {
      this.token = res.access_token;
      this.getProfile();
    });
  }

  getProfile() {
    this.authServices.getProfileInfo(this.token).subscribe((user) => {
      this.profile = user;
    });
  }
}
