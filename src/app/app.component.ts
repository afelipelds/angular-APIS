import { Component } from '@angular/core';

import { Product } from './models/product.model';
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
    this.usersServices
      // This is just an example of a creation
      .createUser({
        avatar: 'https://imgur.com/gallery/bUZpbUe',
        name: 'Cheese Cat',
        email: 'cat@chee.se',
        password: 'ilovecheese',
      })
      .subscribe((res: any) =>
        console.log('this is the user created -> ', { res })
      );
  }

  loginUser() {
    this.authServices
      .login({ email: 'cat@chee.se', password: 'ilovecheese' })
      .subscribe((res) =>
        console.log('this is the token -> ', res.access_token)
      );
  }
}
