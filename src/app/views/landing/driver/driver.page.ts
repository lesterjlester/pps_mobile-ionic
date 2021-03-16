import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  open_maps() {
    this.router.navigate(['landing/maps'])
  }
}
