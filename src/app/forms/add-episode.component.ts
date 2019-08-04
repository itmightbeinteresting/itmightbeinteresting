import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Creds } from 'private/private';
import { butterService } from '../services/butterCMS.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EpisodeService } from '../services/post.service';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['../app.component.scss'],
  providers: [
    EpisodeService,
    ApiService
  ]
})
export class AddEpisodeComponent implements OnInit {
  creds: any = Creds;
  approved: boolean;
  posts: any;
  episode: any;
  episodes: any;
  slug: string;
  website_url: string;
  available: any;
  selectedPost: any;
  addEpisode: FormGroup;
  editEpisode: FormGroup;
  dateNow: Date = new Date();
  display: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private episodeService: EpisodeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (!sessionStorage.email || sessionStorage.email !== this.creds.email) {
      this.approved = false;
      this.router.navigate(['/login']);
    } else {
      this.approved = true;
    }
    this.fetchPosts();
    this.getPosts();
    this.addEpisode = this.formBuilder.group({
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
    this.editEpisode = this.formBuilder.group({
      released: null,
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
      this.episodes = data.episodes;
      for (let i = 0; i < this.episodes.length; i++) {
        if (this.episodes[i].released === true) {
          this.episodes[i].released = 'Yes';
        } else {
          this.episodes[i].released = 'No';
        }
      }
      return data;
    });
  }

  submit(): void {
    if (this.approved = true) {
      if (this.addEpisode.value.released === 'yes') {
        this.addEpisode.value.released = true;
      } else {
        this.addEpisode.value.released = false;
      }
      if (!this.addEpisode.value.itunes_url) {
        this.addEpisode.value.itunes_url = null;
      }
      if (!this.addEpisode.value.youtube_url) {
        this.addEpisode.value.youtube_url = null;
      }
      if (!this.addEpisode.value.spotify_url) {
        this.addEpisode.value.spotify_url = null;
      }
      this.addEpisode.value.added = this.dateNow.toISOString();
      this.episodeService.addEpisode(this.addEpisode.value).subscribe(res => {
        if (res) {
          this.addSingle();
        }
        return res;
      });
    } else {
      this.addApprovedError();
    }
  }

  showDialog(episode) {
    this.episode = episode;
    this.display = true;
  }

  update() {
    if (this.approved === true) {
      if (this.editEpisode.value.released === 'yes') {
        this.editEpisode.value.released = true;
      } else {
        this.editEpisode.value.released = false;
      }
      if (!this.editEpisode.value.itunes_url) {
        this.editEpisode.value.itunes_url = null;
      }
      if (!this.editEpisode.value.youtube_url) {
        this.editEpisode.value.youtube_url = null;
      }
      if (!this.editEpisode.value.spotify_url) {
        this.editEpisode.value.spotify_url = null;
      }
      this.episode.released = this.editEpisode.value.released;
      this.episode.slug = this.editEpisode.value.slug;
      this.episode.website_url = this.editEpisode.value.website_url;
      this.episode.embed_url = this.editEpisode.value.embed_url;
      this.episode.itunes_url = this.editEpisode.value.itunes_url;
      this.episode.spotify_url = this.editEpisode.value.spotify_url;
      this.episode.youtube_url = this.editEpisode.value.youtube_url;
      const id = this.episode.id;
      this.episodeService.updateEpisode(this.episode, id).then(episode => {
        if (episode) {
          this.getPosts();
          this.display = false;
          this.addSingle();
        }
        return episode;
      });
    } else {
      this.addApprovedError();
    }
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success!'
    });
  }

  addApprovedError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Not approved. You must sign in first.'
    });
  }

  selectPost(post) {
    this.selectedPost = post;
    this.website_url = `https://itmightbeinteresting.com/${this.selectedPost.slug}`;
  }
}
