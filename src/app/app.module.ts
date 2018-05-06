import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController } from 'ionic-angular';
import { MyApp } from './app.component';
import { Push } from '@ionic-native/push';

import { ContactPage } from '../pages/contact/contact';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http"
import { MoovieProvider } from '../providers/moovie/moovie';
import { FeedPage } from "../pages/feed/feed";
import { CartolaProvider } from '../providers/cartola/cartola';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule, Storage } from '@ionic/storage';


import { BrMaskerModule } from 'brmasker-ionic-3';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CrudProvider } from '../providers/crud/crud';
import { RecuperaPage } from '../pages/recupera/recupera';
import { MenuPage } from '../components/menu/menu';
import { IntroPage } from '../pages/intro/intro';
import { SobrePage } from '../pages/sobre/sobre';
import { PerfilPage } from '../pages/perfil/perfil';
import { FilmeDetalhesPage } from '../pages/filme-detalhes/filme-detalhes';
import { AlterarsenhaPage } from '../pages/alterarsenha/alterarsenha';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { EnderecosPage } from '../pages/enderecos/enderecos';
import { MeuspedidosPage } from '../pages/meuspedidos/meuspedidos';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    IntroPage,
    SobrePage,
    PerfilPage,
    FilmeDetalhesPage,
    ContactPage,
    FeedPage,
    LoginPage,
    CadastroPage,
    RecuperaPage,

    AlterarsenhaPage,
    CarrinhoPage,
    EnderecosPage,
    MeuspedidosPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthShortNames: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
      dayShortNames: ['D','S','T','Q','Q','S','S','D'],
    }),
    IonicStorageModule.forRoot({
      name: 'bancodedados',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule,
    ReactiveFormsModule,
    BrMaskerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    IntroPage,
    SobrePage,
    PerfilPage,
    FilmeDetalhesPage,
    ContactPage,
    FeedPage,
    LoginPage,
    CadastroPage,
    RecuperaPage,

    AlterarsenhaPage,
    CarrinhoPage,
    EnderecosPage,
    MeuspedidosPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt' },
    CartolaProvider,
    CrudProvider,
  ]
})
export class AppModule {}
