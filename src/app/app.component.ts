import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  user = {
    avatar: 'https://imgur.com/gallery/bUZpbUe',
    name: 'Jaya The Cat',
    email: 'jaya@catch.me',
    password: 'ImJayaTheCat',
  };

  constructor(
    private usersServices: UsersService,
    private authServices: AuthService
  ) {}

  onLoaded(img: string) {
    // console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    // This is just an example of a creation
    this.usersServices
      .createUser(this.user)
      .subscribe((res: any) =>
        console.log('this is the user created -> ', { res })
      );
  }

  loginUser() {
    // This is just an example of user login using previous _credentials_
    this.authServices
      .login({
        email: this.user.email,
        password: this.user.password,
      })
      .subscribe((res) => (this.token = res.access_token));
  }

  getProfile() {
    this.authServices.getProfileInfo(this.token).subscribe((profile) => {
      console.log('profile', { profile });
    });
  }
}
