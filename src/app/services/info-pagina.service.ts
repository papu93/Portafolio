import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/infoPagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer el archivo JSON
    this.http.get('assets/data/data-page.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {

    //Consultammos los datos de Firebase
    this.http.get('https://portafolio-html-8dff3.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {
      
      this.equipo = resp;
    });
  }

}
