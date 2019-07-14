import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { butterService } from '../services/butterCMS.service';
import { map, take } from 'rxjs/operators';
import { HighlightService } from '../services/highlight.service';
import { EpisodeService } from '../services/post.service';
import { Episode } from '../models/episode';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [
    HighlightService,
    EpisodeService
  ],
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit, AfterViewChecked {
  posts: any;
  highlighted: boolean = false;
  loading: boolean = true;
  postError: boolean;
  tag: any;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  showData: boolean;
  episodes: Episode[];
  episode: Episode;
  postSlug: any;
  iframeUrl: any;

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private highlightService: HighlightService,
    private episodeService: EpisodeService,
    private sanitizer: DomSanitizer
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
    this.showData = false;
    this.step1 = true;
    this.progressLoaderOne();
  }

  progressLoaderOne() {
    const stepOne = setTimeout(() => {
      this.step1 = false;
      this.step2 = true;
      this.fetchPost();
      return stepOne;
    }, 750);
  }

  progressLoaderTwo() {
    const stepTwo = setTimeout(() => {
      this.step3 = false;
      this.step4 = true;
      this.progressLoaderThree();
      return stepTwo;
    }, 750);
  }

  progressLoaderThree() {
    const stepThree = setTimeout(() => {
      this.displayData();
      return stepThree;
    }, 250);
  }

  fetchPost() {
    this.slug$ = this.route.paramMap
      .pipe(
        map(params => (params.get('slug')))
      );
    this.slug$.pipe(
      take(1))
      .toPromise()
      .then(slug => {
        butterService.post.retrieve(slug)
          .then((res) => {
            this.post = res.data;
            this.postSlug = this.post.data.slug;
            this.step2 = false;
            this.step3 = true;
            this.progressLoaderTwo();
          })
          .catch((res) => {
            return res;
          });
      }).then(() => {
        this.fetchDatabasePost();
      });
  }

  fetchDatabasePost() {
    this.episodeService.fetchEpisodes().subscribe(data => {
      if (!data) {
        this.postError = true;
        this.loading = false;
      } else {
        this.episodes = data.episodes;
        for (let i = 0; i < this.episodes.length; i++) {
          if (this.episodes[i].slug === this.postSlug) {
            this.episode = this.episodes[i];
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.episode.embed_url);
          }
        }
        if (!this.episode) {
          return;
        } else {
          return this.episode;
        }
      }
    });
  }

  embedURL() {
    if (!this.episode) {
      return;
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(this.episode.embed_url);
    }
  }

  displayData() {
    if (this.post && this.episode) {
      this.step4 = false;
      this.loading = false;
      this.showData = true;
    }
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    this.router.navigate(['/tag/', this.tag]);
  }
}
