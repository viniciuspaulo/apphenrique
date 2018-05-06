import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { Usuario } from '../../model/Usuario';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CrudProvider } from '../../providers/crud/crud';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;
  public usuario:Usuario;
  public url:SafeResourceUrl;

  constructor(
    public crud:CrudProvider,
    public load:LoadingController,
    public sanitizer: DomSanitizer,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider
  ){
    this.usuario = this.navParams.get("usuario");
  }

  ionViewDidEnter() {
    let carregamento = this.load.create({
      content: "Carregando...",
      duration : 3000
    });
    carregamento.present();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://appandsystem.com/api/carrinho.php?api_key=${this.crud.api}&id_projeto=1&id_user=${this.usuario.id_user}&id_item=${this.navParams.get("id")}`);
  }

  closeModal() {
    this.navCtrl.pop();
}

}
