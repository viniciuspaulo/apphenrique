import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
import { MenuConfigDashBoard } from '../../config/PaginasConfig';
import { FeedPage } from '../../pages/feed/feed';
import { PerfilPage } from '../../pages/perfil/perfil';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild('content') nav: NavController;
  @Input() content: any;

  paginas: Array<any>;

  constructor(
    public app: App, 
    public local:Storage,
    public menu : MenuController) {
      this.paginas = MenuConfigDashBoard;
  }


  openPage(page) {
    this.app.getActiveNav().setRoot(page.pagina);
  }

  home(){
    this.app.getActiveNav().setRoot(FeedPage);
  }

  perfil(){
    this.app.getActiveNav().setRoot(PerfilPage);
  }
  
  sair(){
    this.menu.enable(false);
    this.local.remove("usuario")
    .then(()=>{
      this.app.getActiveNav().setRoot(LoginPage);
    })
  }

}
