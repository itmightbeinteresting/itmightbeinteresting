import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getEpisodes(): Observable<any> {
    const url = environment.apiUrl;
    return this.http.get(url)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

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
        map(res => {
          return res;
        })
      );
  }

  addEpisode(params: HttpParams = new HttpParams()) {
    const url = environment.apiUrl;
    return this.http.post<any>(url, params)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      );
  }
}
