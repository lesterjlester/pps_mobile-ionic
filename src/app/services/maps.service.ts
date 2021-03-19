import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapsService {
  current_position : BehaviorSubject<any>;
  my_position : any = {
    latitude : 14.499142,
    longitude : 121.006297
  }
  constructor( private geolocation: Geolocation,) {
    this.current_position = new BehaviorSubject({
      accuracy : 0,
      altitude : 0,
      altitudeAccuracy : 0,
      latitude : 0,
      longitude : 0,
      heading : 0,
      speed : 0,
    });
   } 

  get_location(){
    return new Promise(resolve => { 
      this.geolocation.getCurrentPosition().then((resp) => { 
        console.log("location service");
        console.log(resp);
        var latlng = {
          lat : resp.coords.latitude,
          lng : resp.coords.longitude
        } 
        this.my_position.latitude = resp.coords.latitude;
        this.my_position.longitude = resp.coords.longitude;
        // coords = {
        //   accuracy,
        //   altitude,
        //   altitudeAccuracy,
        //   heading,
        //   latitude,
        //   longitude,
        //   speed
        // }
        resolve(resp.coords);
      }).catch((error) => {
        console.log("loc service error");
        console.log(error);

        console.log('Error getting location', error);
        console.log(error);
        resolve(false);
        // console.log('Error getting location', error);
      });
     
    })
  }
}
