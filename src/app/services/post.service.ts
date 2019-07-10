import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getEpisodes() {
  return this.http.get<any>('https://itmightbeinteresting.herokuapp.com/api/episodes')
    .toPromise()
    .then(res => <Episode[]>res.data)
    .then(data => {
      return data;
    });
  }

  fetchEpisodes(): Observable<any> {
    return this.http.get('https://itmightbeinteresting.herokuapp.com/api/episodes')
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
