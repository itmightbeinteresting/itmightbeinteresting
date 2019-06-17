import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../services/butterCMS.service';
import { map, take } from 'rxjs/operators';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [
    HighlightService
  ],
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit, AfterViewChecked {
  posts: any;
  highlighted: boolean = false;

  constructor(
    protected route: ActivatedRoute,
    private highlightService: HighlightService
  ) {}

  protected slug$: Observable<string>;
  public post = {
    meta: null,
    data: null
  };

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
    this.highlighted = true;
  }

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
