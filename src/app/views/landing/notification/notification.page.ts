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
  constructor(private router : Router, private authService: AuthenticationService) { } 
  ngOnInit() { 
    this.authService.getData('admin/notif/getList').then((res) => {
      if (res.success) {
        this.notifList = res.data;
      }
    })
  }
  readUrl() {
    let obj = {id: 1, title: 'This is the TItkle', content: 'Content Here!'}
    this.router.navigateByUrl('notification-deatil', {
      state: {
        item: obj,
      }
    }); 
  }
}
