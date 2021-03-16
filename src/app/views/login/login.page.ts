import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/Authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: null
  password: null
  constructor(public alertController: AlertController, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  async signin() {
    if (!this.email || !this.password){
     return this.presentAlert('Invalid Credentials');
    } 
    this.authService.login({email: this.email, password: this.password}); 
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
