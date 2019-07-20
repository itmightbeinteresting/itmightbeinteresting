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
  tag: any;
  options: any;
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
    this.postSlug = this.postSlug.toString();
    this.episodeService.getEpisode(this.postSlug).subscribe(data => {
      if (!data) {
        this.displayData();
        return;
      } else {
        this.episode = data.episode;
        if (this.episode.embed_url === null || this.episode.embed_url === '') {
          this.options = false;
          this.displayData();
        } else {
          this.options = true;
          this.embedURL();
        }
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.episode.embed_url);
        return this.episode;
      }
    });
  }

  async embedURL() {
    setTimeout(() => {
      if (!this.episode) {
        this.displayData();
        return;
      } else {
        this.displayData();
        return this.sanitizer.bypassSecurityTrustUrl(this.episode.embed_url);
      }
    }, 500);
  }

  async displayData() {
    if (this.post) {
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
