import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CrudProvider } from '../../providers/crud/crud';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MeuspedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-meuspedidos',
  templateUrl: 'meuspedidos.html',
})
export class MeuspedidosPage {

  public url:SafeResourceUrl;
  public pagina = 'historico';


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