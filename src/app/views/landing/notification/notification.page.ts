import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/Authentication.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit { 
  notifList = [];
  annoucementList = [];
  constructor(private router : Router, private authService: AuthenticationService) { } 
  ngOnInit() {  
    this.authService.getData('user/notification/list').then((res) => { 
      if (res.status == 'OK') {
        this.notifList = res.data;
      }
    });
    this.authService.getData('admin/annoucement/list').then((res) => { 
      if (res.status == 'OK') {
        this.annoucementList = res.data;
      }
    }) 
  }
  readUrl(data) { 
    let obj = data;
    this.router.navigateByUrl('notification-deatil', {
      state: {
        item: obj,
      }
    }); 
  }
}
