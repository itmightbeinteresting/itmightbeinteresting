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
  loading: boolean;
  alert: boolean;
  postError: boolean;
  tag: any;
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

  async ngOnInit() {
    this.loading = true;
    this.delayFetch();
  }

  async delayFetch() {
    const fetchDelay = setTimeout(() => {
      this.fetchPost();
      return fetchDelay;
    }, 250);
  }

  async fetchPost() {
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
            if (!res || !res.data) {
              this.alert = true;
              this.loading = false;
              console.log(res);
            } else {
              this.post = res.data;
              this.postSlug = this.post.data.slug;
              this.delayDatabase();
            }
          })
          .catch((err) => {
            return err;
          });
      });
  }

  async delayDatabase() {
    const dbDelay = setTimeout(() => {
      this.fetchDatabasePost();
      return dbDelay;
    }, 500);
  }

  async fetchDatabasePost() {
    this.episodeService.fetchEpisodes().subscribe(data => {
      if (!data || !data.episodes) {
        this.alert = true;
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
          this.alert = true;
          this.loading = false;
          console.log(data);
          return;
        } else {
          this.embedURL();
          return this.episode;
        }
      }
    });
  }

  async embedURL() {
    setTimeout(() => {
      if (!this.episode) {
        this.alert = true;
        this.loading = false;
        return;
      } else {
        this.displayData();
        return this.sanitizer.bypassSecurityTrustUrl(this.episode.embed_url);
      }
    }, 500);
  }

  async displayData() {
    if (this.post && this.episode) {
      this.loading = false;
      this.alert = false;
      this.showData = true;
    }
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    this.router.navigate(['/tag/', this.tag]);
  }
}
