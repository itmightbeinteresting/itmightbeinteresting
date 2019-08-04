import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Creds } from 'private/private';
import { butterService } from '../services/butterCMS.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EpisodeService } from '../services/post.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [
    EpisodeService,
    ApiService
  ]
})
export class AddPostInfoComponent implements OnInit {
  creds: any = Creds;
  posts: any;
  slug: string;
  website_url: string;
  selectedPost: any;
  addPost: FormGroup;
  dateNow: Date = new Date();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService
  ) {}

  ngOnInit() {
    if (!sessionStorage.email || sessionStorage.email !== this.creds.email) {
      this.router.navigate(['/login']);
    }
    this.fetchPosts();
    this.getPosts();
    this.addPost = this.formBuilder.group({
      released: null,
      added: null,
      title: null,
      slug: null,
      website_url: null,
      embed_url: null,
      itunes_url: null,
      youtube_url: null,
      spotify_url: null
    });
  }

  fetchPosts() {
    butterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      this.posts = res.data.data;
    })
    .catch((err) => {
      return err;
    });
  }

  getPosts() {
    this.episodeService.getEpisodes().subscribe(data => {
      console.log(data);
      return data;
    });
  }

  submit(): void {
    if (this.addPost.value.released === 'yes') {
      this.addPost.value.released = true;
    } else {
      this.addPost.value.released = false;
    }
    if (!this.addPost.value.itunes_url) {
      this.addPost.value.itunes_url = null;
    }
    if (!this.addPost.value.youtube_url) {
      this.addPost.value.youtube_url = null;
    }
    if (!this.addPost.value.spotify_url) {
      this.addPost.value.spotify_url = null;
    }
    this.addPost.value.added = this.dateNow.toISOString();
    this.episodeService.addEpisode(this.addPost.value).subscribe(res => {
      return res;
    });
  }

  selectPost(post) {
    this.selectedPost = post;
    this.website_url = `https://itmightbeinteresting.com/${this.selectedPost.slug}`;
  }
}
