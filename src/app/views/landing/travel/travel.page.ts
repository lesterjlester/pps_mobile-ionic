import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/Authentication.service';
import {
  Geocoder,
  GeocoderRequest
} from '@ionic-native/google-maps';
declare var google;
@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  travelList = [];
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getData('admin/travel/gettravelbyId').then((res) => {
      if (res.success) {
        this.travelList = res.data;
      }
    })
  }
  async open_maps(item) { 
    if (!item) return;
    let data = await this.GetLatlong(item.dest);
    this.router.navigateByUrl('maps', {
      state: {
        item: data,
      }
    });
  }
  GetLatlong(value) {
    return new Promise(resolve => {
      var geocoder = new google.maps.Geocoder();
      var address = value;
      geocoder.geocode({
        'address': address
      }, function (results, status) {
        console.log(results, status)
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          resolve({ lat: latitude, lng: longitude })
        }
      });
    })
  }

}
