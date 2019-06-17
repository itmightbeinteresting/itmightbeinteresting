import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../services/butterCMS.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit {
  posts: any;

  constructor(
    protected route: ActivatedRoute
  ) {}

  protected slug$: Observable<string>;
  public post = {
    meta: null,
    data: null
  };

  ngOnInit() {
    this.slug$ = this.route.paramMap
      .pipe(
        map(params => (params.get('slug')))
      );
    this.slug$.pipe(
      take(1))
      .subscribe(slug => {
        butterService.post.retrieve(slug)
          .then((res) => {
            this.post = res.data;
            console.log(this.post);
          })
          .then(() => {
            console.log(this.post.data.author.first_name);
          })
          .catch((res) => {
            console.log(res);
          });
      });
  }
}
