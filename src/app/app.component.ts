import { Component } from '@angular/core';
import { Platform, MenuController, NavController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from "../pages/intro/intro";

import { ConfigProvider } from "../providers/config/config";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { FeedPage } from '../pages/feed/feed';
import { Push, PushOptions, PushObject } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage:any;

  constructor(
    public app:App,
    public banco: Storage,
    public menu:MenuController,
    public push: Push,
    public alert:AlertController,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    configProvider: ConfigProvider
  ) {
    this.menu.enable(false);
    platform.ready().then(() => {
      
      this.banco.get("check")
      .then(check =>{
        if(check){
          this.banco.get("usuario")
          .then(logado =>{
            if(logado){
              this.rootPage = FeedPage;
            }else{
              this.rootPage = LoginPage;
            }
          })
        }else{
          this.rootPage = IntroPage;
        }
      })

      statusBar.styleDefault();
      splashScreen.hide();

      this.configPush()

    });
  }


  configPush(){

    const options: PushOptions = {
      android: {
        senderID : '200176729278' 
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);

   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

   pushObject.on('notification').subscribe((notification: any) =>{
    let notificacao = this.alert.create({
      title: notification.label,
      message: notification.message
    });
    notificacao.present();
   });

  }

  get navCtrl(): NavController {
    return this.app.getRootNav()[0];
  }
}
