import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/Authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo= {};
  constructor(private authService: AuthenticationService) { }
   
  async ngOnInit() {
    let data = await this.authService.getStorages('USER_INFO'); 
   this.userInfo = data;
  }
  logout() {
    this.authService.logout();
  }

}
