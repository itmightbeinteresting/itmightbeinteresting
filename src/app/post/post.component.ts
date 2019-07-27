import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
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
  title: any;
  tag: any;
  tags: any;
  options: any;
  showData: boolean;
  episodes: Episode[];
  episode: Episode;
  episodeFound: boolean;
  postSlug: any;
  iframeUrl: any;

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private highlightService: HighlightService,
    private episodeService: EpisodeService,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private titleService: Title
  ) {
    this.titleService.setTitle(`${localStorage.getItem('title')} | It Might Be Interesting`);
    this.meta.updateTag({name: 'description', content: localStorage.getItem('title')});
  }

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
    this.fetchPost();
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
              this.title = this.post.data.title;
              this.tags = this.post.data.tags;
            }
          }).then(() => {
            this.displayData();
            this.fetchDatabasePost();
          })
          .catch((err) => {
            return err;
          });
      });
  }

  async fetchDatabasePost() {
    this.postSlug = this.postSlug.toString();
    this.episodeService.getEpisode(this.postSlug).subscribe(data => {
      if (data) {
        this.episode = data.episode;
        this.episodeFound = true;
        if (this.episode.embed_url === null || this.episode.embed_url === '') {
          this.options = false;
        } else {
          this.options = true;
          this.embedURL();
        }
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.episode.embed_url);
        return this.episode;
      } else {
        this.episodeFound = false;
        return;
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
