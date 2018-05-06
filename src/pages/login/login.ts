import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroPage } from '../cadastro/cadastro';
import { CrudProvider } from '../../providers/crud/crud';
import { Usuario } from '../../model/Usuario';
import {Md5} from 'ts-md5/dist/md5';
import { RecuperaPage } from '../recupera/recupera';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public menu:MenuController,
    public crud:CrudProvider,
    public load:LoadingController,
    public toast: ToastController,
    public banco : Storage,
    public navCtrl: NavController, 
    public formBuilder:FormBuilder,
    public navParams: NavParams) {
      this.menu.enable(false);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      senha: ['', Validators.required]
    });

    this.noTabs();
  }

  ionViewDidLoad() {
    this.noTabs();
  }


  logar(){
    let carregamento = this.load.create({content : "Carregando..."});
    carregamento.present();
  
    let usuario:Usuario = this.form.value;
    usuario.senha = Md5.hashStr(usuario.senha).toString();
    this.crud.buscar('login',`email=${usuario.email}&senha=${usuario.senha}`)
    .subscribe(dados =>{
      carregamento.dismiss();
      if(dados.success === 1){
        usuario.id_user = dados.id_user;
        usuario.token = dados.token;
        this.banco.set("usuario",usuario);
        this.toast.create({message : 'Logado com sucesso.', duration:3000}).present();
        this.navCtrl.setRoot(FeedPage);  
      }else{
        this.toast.create({message : dados.description, duration:3000}).present(); 
      }
    },erro =>{
      carregamento.dismiss();
      this.toast.create({message : 'Não foi possivel logar.', duration:3000}).present();  
    });      
  }

  recuperarsenha(){
    this.navCtrl.push(RecuperaPage);
  }

  cadastrar(){
    this.navCtrl.push(CadastroPage);
  }



  ionViewWillEnter(){
    this.noTabs();
  }

  noTabs(){
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
  }

}
