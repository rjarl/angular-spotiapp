import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService, private router: Router) {

    this.loading = true;
    this.error = false;

    if (!this.spotify.haveToken) {
      this.loading = true;
    }

    this.spotify.getNewReleases()
      .subscribe( (resp: any) => {

        this.nuevasCanciones = resp;
        this.loading = false;

      }, ( errorServicio ) => {

        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
        if (this.mensajeError.indexOf('expired') !== -1) {
          this.spotify.reloadToken();
          this.router.navigate(['/home']);
        }
        this.loading = false;
      });
  }



}
