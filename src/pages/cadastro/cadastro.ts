import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CrudProvider } from '../../providers/crud/crud';
import { Usuario } from '../../model/Usuario';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the CadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  form: FormGroup;

  constructor(
    public banco:Storage,
    public crud:CrudProvider,
    public load: LoadingController,
    public toast: ToastController,
    public navCtrl: NavController, 
    public formBuilder:FormBuilder,
    public navParams: NavParams) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      senha: ['', Validators.required],
      telefone: ['', [Validators.required,Validators.minLength(14)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  cadastrar(){
    let carregamento = this.load.create({content : "Carregando..."});
    carregamento.present();
  
    let usuario:Usuario = this.form.value;
    usuario.senha = Md5.hashStr(usuario.senha).toString();
    usuario.telefone = usuario.telefone.replace("(","").replace(")","").replace(" ","").replace("-","");
    this.crud.buscar('cadastro',`email=${usuario.email}&senha=${usuario.senha}&ddd=${usuario.telefone[0]+usuario.telefone[1]}&telefone=${usuario.telefone.substring(2,11)}&nome=${usuario.nome}`)
    .subscribe(dados =>{
      carregamento.dismiss();
      if(dados.success === 1){
        usuario.id_user = dados.id_user;
        usuario.token = dados.token;
        this.banco.set("usuario",usuario);
        this.toast.create({message : 'Cadastro com sucesso.', duration:3000}).present();  
        this.navCtrl.setRoot(FeedPage);  
      }else{
        this.toast.create({message : dados.description, duration:3000}).present(); 
      }
    },erro =>{
      carregamento.dismiss();
      this.toast.create({message : 'Não foi possivel cadastrar.', duration:3000}).present();  
    });  
  }


}
