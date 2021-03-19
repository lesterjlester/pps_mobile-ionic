import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

import {
  MapsService
} from '../../../services/maps.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition
} from '@ionic-native/google-maps';
declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit { 
  marker: any=google.maps.Marker;
  map: any;
  speed: any = 0; 
  cont: any=0;


  latitude: any;
  longitude: any;
  @ViewChild('map', {
    static: true
  }) mapElement: ElementRef;
  gmap: GoogleMap;
  museumData = [];

  constructor(private geolocation: Geolocation,public loadingController: LoadingController, private mapservice: MapsService) { }

  ngOnInit() {
    this.getPosition();
  }


  getPosition(){
  
    this.mapservice.get_location().then((position : any) => {
      console.log(position,'private mapservice: MapsService,');
    });
     }


  centerZoom(latlng) {
    // this.gmap.setPadding(100,0,100,0);
    let position: CameraPosition<{}> = {
      target: latlng,
      tilt: 0,
      duration: 1000
    };
    this.gmap.animateCamera(position).then(res => {
      // this.detailsBox = true;
      // this.gmap.animateCameraZoomOut();
    });
  } 
  addMarker() {
    let icondata: any = {
      url: 'https://www.clipartmax.com/png/middle/249-2493079_our-ruwi-office-location-uca-student-union-logo.png',
      size: {
        width: 48,
        height: 48
      }
    }
    this.gmap.addMarker({
      icon: icondata,
      position: { lat: 14.537752, lng: 121.001381 }
    });
  }
  addPickup() {
    let icondata: any = {
      url: 'https://cdn0.iconfinder.com/data/icons/geo-points/154/bus-512.png',
      size: {
        width: 48,
        height: 48
      }
    }
    this.gmap.addMarker({
      icon: icondata,
      position: { lat: 14.466667, lng: 121.016667 }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
   


  ngAfterViewInit(): void {
    console.log('sdasdasjdhaskjdhaskjdh jkasdhajks');
    this.getPosition();
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 14.499142,
          lng: 121.006297
        },
        zoom: 14
      },
      controls: {
        mapToolbar: false
      },
      gestures: {
        tilt: false,
        rotate: false
      }  
    }

    this.gmap = GoogleMaps.create("map", mapOptions);
    this.gmap.setMyLocationEnabled(true);
    this.gmap.setPadding(50, 20, 150, 20);
    this.gmap.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.centerZoom({
        lat: 14.499142,
        lng: 121.006297
      });
      this.getData();
      this.addMarker();
      this.addPickup();
    });
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.latitude = resp.coords.latitude;
    //   this.longitude = resp.coords.longitude;
    //   const map = new google.maps.Map(this.mapContainer.nativeElement, {
    //     center: { lat: 14.466667, lng: 121.016667 },
    //     zoom: 15,
    //   });
    //   /*location object*/
    //   const pos = {
    //     lat: this.latitude,
    //     lng: this.longitude
    //   };
    //   this.getData();
    //   map.setCenter(pos);
    //   const icon = {
    //     url: 'https://cdn0.iconfinder.com/data/icons/geo-points/154/bus-512.png', // image url
    //     scaledSize: new google.maps.Size(50, 50), // scaled size
    //   };
    //   const marker = new google.maps.Marker({
    //     position: pos,
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    //     title: 'Hello World!',
    //     icon: icon
    //   });
    //   const contentString = '<div style="color:red" id="content">' + 'asdsda' +
    //     '</div>';
    //   const infowindow = new google.maps.InfoWindow({
    //     content: contentString,
    //     maxWidth: 400
    //   });
    //   marker.addListener('click', function () {
    //     infowindow.open(map, marker);
    //   });
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  getData() {
    let points = [
      { lat: 14.537752, lng: 121.001381 },
      { lat: 14.466667, lng: 121.016667 }
    ];
    this.gmap.addPolyline({
      points: points,
      'color': '#AA00FF',
      'width': 10,
      'geodesic': true
    });
  }



  //   return 
  //   var pointA = {lat: 14.537752, lng: 121.001381};
  //   let pointB : any;
  //   var latlngArr = [];
  //   latlngArr.push({lat: 14.466667, lng: 121.016667});
  //   this.jobPin({lat: 14.537752, lng: 121.001381},'drop-off');
  //   this.drawPoly(pointA,latlngArr);

  //       // this.centerZoom(latlngArr);
  // }
  // async drawPoly(pointa,pointb){
  //   var newpolyPoints = [
  //     pointa,
  //     pointb
  //   ];
  //   await this.map.addPolyline({
  //     points: newpolyPoints,
  //     'color': '#AA0000',
  //     'width': 2,
  //     zIndex: 3
  //   }).then(polyline => {
  //     // this.jobPoly.push(polyline);
  //   });
  // }


  // async jobPin(marker_position, type="pickup") {

  //   let icondata : any = {
  //     url: 'https://cdn0.iconfinder.com/data/icons/geo-points/154/bus-512.png',
  //     size: {
  //       width: 48,
  //       height: 48
  //     }
  //   }
  //   if (type == 'drop-off')
  //     icondata.url = 'https://cdn0.iconfinder.com/data/icons/geo-points/154/bus-512.png';
  //   await this.map.addMarker({
  //     icon: icondata,
  //     position: marker_position,
  //   }).then((marker) => {
  //     // if (type == 'pickup')
  //     //   this.jobMarker.push(marker);
  //     // else if (type == 'drop-off')
  //     //   this.dropOffMarker.push(marker);
  //   });

  // }


  // displayGoogleMap() {
  //   const latLng = new google.maps.LatLng(14.466667, 121.016667);
  //   const mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  //   const marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: latLng
  //   });
  //   this.addInfoWindow(marker, 'driver 1' + 'tracking');
  // }

  // addInfoWindow(marker, content) {
  //   const infoWindow = new google.maps.InfoWindow({
  //     content
  //   });
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
  // }

}
