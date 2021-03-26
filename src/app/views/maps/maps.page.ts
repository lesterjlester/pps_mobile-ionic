import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController, AlertController  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
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
  marker: any=google.maps.Marker;
  map: any;
  speed: any = 0; 
  cont: any=0;

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

  constructor(private geolocation: Geolocation,public loadingController: LoadingController, private mapservice: MapsService,
     public actionSheetController: ActionSheetController, public alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
    this.launch_gmaps();
  } 

  getPosition(){
  
    this.mapservice.get_location().then((position : any) => {
      let origin = { lat: position.latitude, lng: position.longitude };
      let destination = { lat: 14.466667, lng: 121.016667 } 
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
  addMarker() {
    let icondata: any = {
      url: 'assets/map/destination.png',
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
    
    console.log("MAP - Launching G MAPS");
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
      // this.initApp();
      // this.my_position = {
      //   lat : this.mapservice.my_position.latitude,
      //   lng: this.mapservice.my_position.longitude
      // }
      // this.startGo();
      // var initCheck = true;
      // this.watchWatch = this.watch_job_ready().subscribe((rdy) => {
      //   if (rdy && initCheck){
      //     // this.watch_rider();
      //     this.pantome();
      //     initCheck = false;
      //   }
      // });
    });
  };
   


  // ngAfterViewInit(): void { 
  //   this.getPosition();
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: 14.499142,
  //         lng: 121.006297
  //       },
  //       zoom: 14
  //     },
  //     controls: {
  //       mapToolbar: false
  //     },
  //     gestures: {
  //       tilt: false,
  //       rotate: false
  //     }
  //   }

  //   this.gmap = GoogleMaps.create("map", mapOptions);
  //   this.gmap.setMyLocationEnabled(true);
  //   this.gmap.setPadding(50, 20, 150, 20);
  //   this.gmap.one(GoogleMapsEvent.MAP_READY).then(() => {
  //     // this.watch_rider();
  //     this.pantome();
  //     // this.ongoing_jobs();
  //     // this.initApp();
  //   });


  //   // this.gmap = GoogleMaps.create("map", mapOptions);
  //   // this.gmap.setMyLocationEnabled(true);
  //   // this.gmap.setPadding(50, 20, 150, 20);
  //   // this.gmap.one(GoogleMapsEvent.MAP_READY).then(() => {
  //   //   this.centerZoom({
  //   //     lat: 14.499142,
  //   //     lng: 121.006297
  //   //   });
  //   //   this.getData();
  //   //   this.addMarker();
  //   //   this.addPickup();
  //   // }); 
  // }

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
        
        // this.distance = response.routes[0].legs[0].distance.text;
        // this.duration = response.routes[0].legs[0].duration.text; 
        wayPointsArray =  Encoding.decodePath(geoCodedPoints);
        // google.maps.geometry.encoding.decodePath(geoCodedPoints); 
        var waypointsArr = [];
        wayPointsArray.forEach(point => { 
          if (point){
            waypointsArr.push(point)
          }
        });  
        this.drawDirections(waypointsArr);
        // this.currentWaypoints = waypointsArr;
        // this.recursiveAnimate(0);

        // setTimeout(() => {
        //   this.animatePoly(waypointsArr);
        // },1000);

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
      // let icondata: any = {
      //   url: 'assets/map/destination.png',
      //   size: {
      //     width: 48,
      //     height: 48
      //   }
      // }
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


  pantome() {
    return new Promise(resolve => { 
      LocationService.getMyLocation({
        enableHighAccuracy: true
      }).then((pos: MyLocation) => {
      console.log(pos,'exexe')
        // alert("panto POS: " + JSON.stringify(pos));
        // this.rider_position = {
        //   latitude : pos.latLng.lat,
        //   longitude : pos.latLng.lng,
        //   // accuracy : pos.accuracy,
        //   // bearing : pos.bearing,
        //   // altitude : pos.altitude,
        //   // speed : pos.speed
        // };

        // if (pos.speed)
        //   this.rider_position.speed = pos.speed;
        // if (pos.accuracy)
        //   this.rider_position.accuracy = pos.accuracy;
        // if (pos.altitude)
        //   this.rider_position.altitude = pos.altitude;

        // console.log("Pan to me");
        // console.log(this.rider_position);
        
        // this.current_latlng = pos.latLng;
        // this.mapservice.convert_place_to_latlng(pos.latLng).then(
        //   (res: any) => {
        //     console.log("Hey Check Province");
        //     console.log(res);
        //     if (res){
        //       this.check_province = res;
        //       this.showToast(this.check_province);
        //     }
        //     else{
        //       this.showToast("failed to get location");
        //     }
        //   }
        // ) 
        let newpos: CameraPosition < {} > = {
          target: pos.latLng,
          tilt: 0,
          zoom: 18,
          duration: 1000
        };
        this.gmap.animateCamera(newpos);
        resolve(true);
      },err => {
        resolve(false);
        console.log("Address Not Found"); 
      });
    });
  }


  
  run_interval(){
    setInterval(() => {
      this.mapservice.get_location().then((position : any) => { 
        console.log(position);
            if (position.bearing){
            this.driver_pin.setRotation(this.driver_pin.bearing)
          }
          if (position.heading){
            this.driver_pin.setRotation(this.driver_pin.heading)
          } 
      });
    },10000)
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
  send() {
    this.presentActionSheet();
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
          console.log('Delete clicked');
        }
      }, {
        text: 'No Gas',
        icon: 'alert',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Accident',
        icon: 'alert',
        handler: () => {
          console.log('Play clicked');
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
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  google_api(url){
    return new Promise (resolve => {
      var googleMapsApiKey = "AIzaSyCKo1jxVNB8oDgoLxcK6kUBBWFk6jWWKLI";
      var google_api = "https://maps.googleapis.com/maps/api/" + url + "&key=" + googleMapsApiKey;
      var xurl = "https://cors-anywhere.herokuapp.com/" + google_api; // bypass CORS
      this.http.get(xurl).subscribe(
        (res : any) => {
          console.log(res,'resresresresresresres')
          resolve(res);
        },err => {
          resolve(false);
        }
      )
      
    })
  }
}
