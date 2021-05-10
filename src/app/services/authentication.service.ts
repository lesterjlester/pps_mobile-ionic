import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = `https://backend.localhost/api`;
@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  private accessToken;
  private headers;
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.init();
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
  async getStorages(key) {
    return await this.storage.get(key);
  }
  async setStorages(key, value) {
    return await this.storage.set(key, value);
  }


  async init() {
    this.accessToken = await this.getStorages('access_token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  } 
  async postData(param: any, url_type: string) { 
    const api = `${apiUrl}/${url_type}`;
    return this.http.post<any>(api, param, { headers: this.headers }).toPromise();
  }  
  async getData(url_type: string) { 
    let api = `${apiUrl}/${url_type}`; 
    return this.http.get<any>(api, { headers: this.headers }).toPromise();
  } 
  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



}