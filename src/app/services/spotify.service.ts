import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken: string;
  haveToken: boolean;

  constructor( private http: HttpClient) {
    console.log('Spotify Service Listo!');
    this.haveToken = false;
    
  }

  reloadToken() {
    this.haveToken = false;
  }


  getAutoTokenQuery(query: string): Observable<Object> {
    if (this.haveToken) {
      console.log('Tengo el token');
      return this.getQuery(query);
    } else {
      console.log('No tengo  el token, o token expirado');
      return this.getToken()
      .pipe(switchMap((resp: any) => {
        this.spotifyToken = resp.access_token;
        console.log('He obtenido el Token!: ' + this.spotifyToken);
        this.haveToken = true;
        return this.getQuery(query);
     }));
    }
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
  
    const headers = new HttpHeaders({
     // TODO: get sincrono?¿?
      'authorization' : 'Bearer ' + this.spotifyToken

     // tslint:disable-next-line:max-line-length
     /*'authorization' : 'Bearer ' + 
     'BQC-PgyT8Jh_d1I50kdITDnvmbA0RwCb-UUjX537DPHb7jE8cDTGWf2WM8MIXFLYkMShON9tX9MI3yiXFBI'*/
    });
    return this.http.get( url , { headers } );
  }

  getToken() {
    const client_id = 'iiiiiiiiiii';
    const client_secret =  'sssssssssssss';
    const url = `https://spotify-get-token.herokuapp.com/spotify/${ client_id }/${ client_secret }`;
    return this.http.get(url);
    /*.subscribe( (resp: any) => {
      this.spotifyToken = resp.access_token;
      console.log('He obtenido el Token!: ' + this.spotifyToken);
      this.haveToken = true;
  }, (error) => {
      console.log('Ocurrió error obteniendo Token: ' + error);
      this.haveToken = false;
  });*/
    
  }

  getNewReleases() {
    // country=ES&
          return this.getAutoTokenQuery('browse/new-releases?limit=15')
                .pipe(map (resp => resp['albums'].items ));
  }

  getArtistas(termino: string) {
      return this.getAutoTokenQuery(`search?q=${ termino }&type=artist&limit=15`)
                 .pipe(map (resp =>  resp['artists'].items ));
  }

  getArtist(id: string) {
    return this.getAutoTokenQuery(`artists/${ id }`);
               // .pipe(map (resp => resp ));
  }
  
  getTopTracks(id: string) {
    return this.getAutoTokenQuery(`artists/${ id }/top-tracks?country=US`)
                .pipe(map (resp =>  resp['tracks'] ));
  }
}
