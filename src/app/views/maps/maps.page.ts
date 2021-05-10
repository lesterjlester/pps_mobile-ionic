import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';
import { NavController } from '@ionic/angular';
import {
  MapsService
} from '../../services/maps.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  LocationService,
  MyLocation,
  Encoding
} from '@ionic-native/google-maps';
declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  marker: any = google.maps.Marker;
  map: any;
  speed: any = 0;
  cont: any = 0;
  new_destination: any;

  driver_pin: any;
  destination_pin: any;
  mainPoly: any;

  latitude: any;
  longitude: any;
  @ViewChild('map', {
    static: true
  }) mapElement: ElementRef;
  gmap: GoogleMap;
  museumData = [];

  constructor(private geolocation: Geolocation, public loadingController: LoadingController, private mapservice: MapsService,
    private navController: NavController,
    public actionSheetController: ActionSheetController, public alertController: AlertController, private http: HttpClient,
    private router: Router, private authService: AuthenticationService, private toastController: ToastController) {
    let params = this.router.getCurrentNavigation().extras.state;
    this.new_destination = params.item;
  }

  ngOnInit() {
    this.launch_gmaps();
  }

  getPosition() {
    this.mapservice.get_location().then((position: any) => {
      let origin = { lat: position.latitude, lng: position.longitude };
      let destination = this.new_destination;
      this.callPoly(origin, destination);
      this.drawMarkers(origin, destination);
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
  addPickup() {
    let icondata: any = {
      url: 'assets/map/destination.png',
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

  launch_gmaps() {
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
      console.log("Map Ready");
      this.getPosition();
      this.run_interval(); 
    });
  };
 
  callPoly(origin, destination) {
    var url = "directions/json?avoid=tolls&" +
      "origin=" + origin.lat + ',' + origin.lng + "" +
      "&destination=" + destination.lat + ',' + destination.lng;
    this.centerZoom([origin, destination]);
    var wayPointsArray = []
    wayPointsArray.push(origin);
    this.google_api(url).then(
      (data: any) => {
        var response = data;
        var geoCodedPoints = response.routes[0].overview_polyline.points; 
        wayPointsArray = Encoding.decodePath(geoCodedPoints);
        // google.maps.geometry.encoding.decodePath(geoCodedPoints); 
        var waypointsArr = [];
        wayPointsArray.forEach(point => {
          if (point) {
            waypointsArr.push(point)
          }
        });
        this.drawDirections(waypointsArr);
      }, err => {
        console.error(err);
      }
    );
  }


  drawDirections(wayPointsArray, zindex = 2) {
    if (this.mainPoly) {
      this.mainPoly.setPoints(wayPointsArray);
      this.centerZoom(wayPointsArray);
    } else {
      this.gmap.addPolyline({
        'points': wayPointsArray,
        'color': '#AA00FF',
        'width': 10,
        zIndex: zindex
      }).then((polyline) => {
        this.mainPoly = polyline;
        this.gmap.setPadding(50, 10, 180, 10);
        this.centerZoom(wayPointsArray);
      }, err => {
      });
    }
  }


  drawMarkers(pin_pick, pin_del) {
    if (this.driver_pin) {
      this.driver_pin.setPosition(pin_pick);
    } else { 
      var icondata: any = {
        url: './assets/map/destination.png',
        size: {
          width: 40,
          height: 40
        }
      }
      this.gmap.addMarker({
        icon: icondata,
        position: pin_pick,
      }).then((marker) => {
        this.driver_pin = marker;
      });
    }
    if (this.driver_pin) {
      this.driver_pin.setPosition(pin_del);
    } else {
      var icondata: any = {
        url: './assets/map/destination.png',
        size: {
          width: 40,
          height: 40
        }
      }
      this.gmap.addMarker({
        icon: icondata,
        position: pin_del,
      }).then((marker) => {
        this.driver_pin = marker;
      });
    }

  }
 



  run_interval() {
    setInterval(() => {
      this.mapservice.get_location().then((position: any) => {
        console.log(position);
        if (position.bearing) {
          this.driver_pin.setRotation(this.driver_pin.bearing)
        }
        if (position.heading) {
          this.driver_pin.setRotation(this.driver_pin.heading)
        }
      });
    }, 10000)
  }


  send() {
    this.presentActionSheet();
  }


  savetoAdmin(data) { 
    this.authService.postData(data, 'admin/incident/save').then((res) => {
      if (res.success) {
        this.presentToast(res.message);
      } else {
        this.presentToast(res.message);
      }
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Flat Tire',
        role: 'destructive',
        icon: 'alert',
        handler: () => {
          let data = { title: 'Flat Tire', content: 'Flat Tire' };
          this.savetoAdmin(data);
        }
      }, {
        text: 'No Gas',
        icon: 'alert',
        handler: () => {
          let data = { title: 'No Gas', content: 'No Gas in the way' };
          this.savetoAdmin(data);
        }
      }, {
        text: 'Accident',
        icon: 'alert',
        handler: () => {
          let data = { title: 'Accident', content: 'Encounter an Accident' };
          this.savetoAdmin(data);
        }
      }, {
        text: 'Other Reason',
        icon: 'alert',
        handler: () => {
          this.presentAlertPrompt();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Incident Reason'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data, 'Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (!data.paragraph) return alert('Invalid Reason!');
            let val = { title: 'Accident', content: data.paragraph };
            this.savetoAdmin(val);
          }
        }
      ]
    }); 
    await alert.present();
  }

  google_api(url) {
    return new Promise(resolve => {
      var googleMapsApiKey = "AIzaSyDhlw6pbriuwr_Mb6KYkVlBar7KD1KTrOs"; 
      var google_api = "https://maps.googleapis.com/maps/api/" + url + "&key=" + googleMapsApiKey; 
      let param = {data: google_api};
      this.authService.postData(param, 'map/getcoordinates').then((res) => {  
        if (res.success) {
          resolve(res.data);
        } else {
          this.presentToast(res.message);
        }
      }) 
    })
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
    this.navController.navigateRoot(`/landing`)
  }
}
