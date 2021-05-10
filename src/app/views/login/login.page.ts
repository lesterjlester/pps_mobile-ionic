import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/Authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: null
  password: null
  constructor(public alertController: AlertController, private authService: AuthenticationService,private router : Router) { }

  ngOnInit() {
  }

  async signin() {
    if (!this.email || !this.password) {
      return this.presentAlert('Invalid Credentials');
    }
    let data = { username: this.email, password: this.password };
    this.authService.postData(data, 'driver/login').then((res) => {
      if (res.status == "Error") {
        return this.presentAlert(res.message);
      } 
      this.authService.setStorages('access_token',res.accessToken);
      this.authService.setStorages('USER_INFO',res.data); 
      this.authService.init();
      this.router.navigate(['landing']); 
      this.authService.authState.next(true);
    }).catch((error) => {
      this.presentAlert('Authentication failed!')
    }); 
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
