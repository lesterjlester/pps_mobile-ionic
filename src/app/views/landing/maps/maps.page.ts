import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  // @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('map', {
    static: true
  }) mapContainer: ElementRef;
  map: any;
  museumData = [];

  constructor(  private geolocation: Geolocation,) { }

  ngOnInit() {
    this.displayGoogleMap(); 
  }

  displayGoogleMap() {
    const latLng = new google.maps.LatLng(14.466667, 121.016667);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.addInfoWindow(marker, 'driver 1' + 'tracking');
  }

  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
