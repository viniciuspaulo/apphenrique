import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  slide:any[] = [];

  constructor(
    public banco: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.slide = [
        { 
          titulo : 'Meu app Fantastico', 
          descricao : 'Este meu app tera funcoes incriveis. Ele foi feito pra impressionar você.', 
          img : './assets/images/preload1.png',
          pular : false
        },
        { 
          titulo : 'Meu app Fantastico', 
          descricao : 'Este meu app tera funcoes incriveis. Ele foi feito pra impressionar você.', 
          img : './assets/images/preload2.png',
          pular : false
        },
        { 
          titulo : 'Meu app Fantastico', 
          descricao : 'Este meu app tera funcoes incriveis. Ele foi feito pra impressionar você.', 
          img : './assets/images/preload3.png',
          pular : true
        },
      ]
      
  }

  ionViewDidLoad() {
    this.banco.set("check",true);
  }

  login(){
    this.navCtrl.push(LoginPage)
  }

  cadastro(){
    this.navCtrl.push(CadastroPage)
  }

}
