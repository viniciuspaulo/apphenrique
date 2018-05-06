import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ModalController } from 'ionic-angular';
import { MoovieProvider } from "../../providers/moovie/moovie";
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { Storage } from '@ionic/storage';
import { CrudProvider } from '../../providers/crud/crud';

/**
 * Generated class for the FeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
      MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
      titulo:"Charles Franca",
      data: "November 5, 1955",
      descricao:"Estou criando um app incrivel...",
      qntd_likes: 12,
      qntd_comments: 4,
      time_comment: "11h ago teste"
  }

  public segmento = 'cardapio';
  public lista_filmes = new Array<any>();
  public page = 1;

  public nome_usuario:string = "Charles Franca do Codigo";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public tabBarElement:any;

  constructor(
      public crud:CrudProvider, 
      public banco:Storage, 
      public modal:ModalController,
      public menu:MenuController,
      public navCtrl: NavController, 
      public navParams: NavParams,
      private movieProvider: MoovieProvider,
      public loadingCtrl: LoadingController
      ){
        this.menu.enable(true);
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number): void{
      //alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    this.banco.get("usuario")
    .then(usuario =>{
      this.modal.create(FilmeDetalhesPage, { id: filme.id, usuario :usuario }).present();
    })
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();
    

    this.banco.get("usuario")
    .then(usuario =>{



      this.crud.buscar("menu",`token_user=${usuario.token}&pagina=${this.page}`)
      .subscribe(data =>{
            const objeto_retorno = data;
  
            if(newpage){
              this.lista_filmes = this.lista_filmes.concat(objeto_retorno);
              this.infiniteScroll.complete();
            }else{
              this.lista_filmes = objeto_retorno;
            }
  
            this.fechaCarregando();
            if(this.isRefreshing){
                this.refresher.complete();
                this.isRefreshing = false;
            }
        }, error => {
            this.fechaCarregando();
            if(this.isRefreshing){
                this.refresher.complete();
                this.isRefreshing = false;
            }
        }
      )
    })
  
  }

}
