import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-deatil',
  templateUrl: './notification-deatil.page.html',
  styleUrls: ['./notification-deatil.page.scss'],
})
export class NotificationDeatilPage implements OnInit {
  new_destination : any;
  constructor(private router : Router) {
    let params = this.router.getCurrentNavigation().extras.state;
    if(params)
    this.new_destination = params.item;
   }

  ngOnInit() {
  }

}
