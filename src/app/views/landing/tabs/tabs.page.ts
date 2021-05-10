import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/Authentication.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  notifCount = 0;
  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
    this.authService.getData('admin/notif/getList').then((res) => {
      if (res.success) {
        this.notifCount = res.data.length;
      }
    })
  }

}
