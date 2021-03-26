import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  open_maps() {
    this.router.navigate(['maps'])
  }
}
