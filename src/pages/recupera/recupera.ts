import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/Usuario';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CrudProvider } from '../../providers/crud/crud';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RecuperaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-recupera',
  templateUrl: 'recupera.html',
})
export class RecuperaPage {

  
  form: FormGroup;

  constructor(
    public crud:CrudProvider,
    public load: LoadingController,
    public toast: ToastController,
    public navCtrl: NavController, 
    public formBuilder:FormBuilder,
    public navParams: NavParams) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  cadastrar(){
    let carregamento = this.load.create({content : "Carregando..."});
    carregamento.present();
  
    let usuario:Usuario = this.form.value;
    this.crud.buscar('recuperar_senha',`email=${usuario.email}`)
    .subscribe(dados =>{
      carregamento.dismiss();
      if(dados.success === 1){
        this.navCtrl.pop();
        this.toast.create({message : 'Email enviado com sucesso.', duration:3000}).present();  
      }else{
        this.toast.create({message : dados.description, duration:3000}).present(); 
      }
    },erro =>{
      carregamento.dismiss();
      this.toast.create({message : 'Não foi possivel recuperar.', duration:3000}).present();  
    });  
  }


}
