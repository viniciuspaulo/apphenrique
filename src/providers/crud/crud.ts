import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CrudProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CrudProvider {

  protected url = '';
  public api = 'appandsystem-123456';
  public projeto = 'id_projeto=1';
  constructor(public http: Http) {
    
  }

  buscar(endpoint:string,dados:string){
    this.url = `https://appandsystem.com/api/${endpoint}.php?api_key=${this.api}&${this.projeto}&`;
    return this.http.get(this.url+dados).map(dados => dados.json())
  }

}
