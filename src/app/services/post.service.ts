import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  episodes: Episode;

  constructor(
    private http: HttpClient
  ) { }

  getEpisode(
    slug: string
  ): Observable<any> {
    const mapObj = {
      '{slug}': slug
    };
    const url = environment.postUrl.replace(/{slug}/gi, function (matched) {
      return mapObj[matched];
    });
    return this.http.get(url)
      .pipe(
        map(data => {
          if (data) {
            return data;
          } else {
            return console.log('No Data Found!');
          }
        })
      );
  }
}
