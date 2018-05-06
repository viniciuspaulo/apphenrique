import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the SobrePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {

  public url:SafeResourceUrl;
  constructor(
    public crud:CrudProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer) {}

  ionViewDidLoad() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://appandsystem.com/api/sobre.php?api_key=${this.crud.api}&${this.crud.projeto}`);
  }

}
