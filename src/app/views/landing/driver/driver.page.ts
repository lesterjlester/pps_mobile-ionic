import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/Authentication.service';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
  userInfo = {};
  constructor(private router: Router, private authService: AuthenticationService) { }

  async ngOnInit() {
    let data = await this.authService.getStorages('USER_INFO'); 
    this.userInfo = data;
  }
  open_maps() {
    this.router.navigate(['landing/maps'])
  }
}
