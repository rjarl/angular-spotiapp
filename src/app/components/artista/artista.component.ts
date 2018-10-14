import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';



@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  loadingArtist: boolean;
  artista: any = {};
  topTracks: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private spotify: SpotifyService) { 
                
    this.loadingArtist = true;

    this.activatedRoute.params.subscribe(params => {

      this.getArtista(params['id']);
      this.getTopTracks(params['id']);

    });

  }

  getArtista (id: string) {
    this.loadingArtist = true;

    this.spotify.getArtist( id )
      .subscribe( (artista: any) => {
        console.log(artista);
        
        this.artista = artista;
        this.loadingArtist = false;
      });
  }

  getTopTracks (id: string) {
    this.spotify.getTopTracks( id )
      .subscribe( (topTracks: any) => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
  }

}
