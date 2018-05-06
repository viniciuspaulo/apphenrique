import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CrudProvider } from '../../providers/crud/crud';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public url:SafeResourceUrl;
  public pagina = 'contato';


  constructor(
    public load:LoadingController,
    public local:Storage,
    public crud:CrudProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer) {}

  ionViewDidLoad() {
    let carregamento = this.load.create({
      content: "Carregando..."
    });
    carregamento.present();
    this.local.get("usuario")
    .then(usuario =>{
      carregamento.dismiss();
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://appandsystem.com/api/${this.pagina}.php?api_key=${this.crud.api}&${this.crud.projeto}&id_user=${usuario.id_user}&token=${usuario.token}`);
    })
  }

}