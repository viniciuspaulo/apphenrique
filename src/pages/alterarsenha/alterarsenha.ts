import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CrudProvider } from '../../providers/crud/crud';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AlterarsenhaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-alterarsenha',
  templateUrl: 'alterarsenha.html',
})
export class AlterarsenhaPage {

  public url:SafeResourceUrl;
  public pagina = 'alterar_senha';


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