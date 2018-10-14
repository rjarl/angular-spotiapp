import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  paises: any[] = [];

  variable: string[] = [];

  constructor( private http: HttpClient ) {

    console.log('Constructor del Home hecho');
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
          .subscribe( (respuesta: any) => {
            this.paises = respuesta;
            console.log(respuesta);
          });

  }

  ngOnInit() {
  }

}
