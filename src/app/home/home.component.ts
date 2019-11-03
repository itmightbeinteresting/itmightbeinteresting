import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../app.component.scss'
  ]
})

export class HomeComponent implements OnInit {
  loading: boolean;
  alert: any;
  posts: any;
  post: any;
  showData: boolean;
  tag: any;
  additionAsyncResult: any;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Episodes | It Might Be Interesting');
  }

  async ngOnInit() {
    this.loading = true;
    this.alert = false;
    this.showData = false;
    this.fetchPosts();
    this.addWithAsync();
  }

  async fetchPosts() {
    return butterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      if (!res || !res.data || !res.data.data) {
        this.loading = false;
        this.alert = true;
      } else {
        this.posts = res.data.data;
        this.alert = false;
        this.displayData();
      }
    })
    .catch((err) => {
      return err;
    });
  }

  async displayData() {
    if (this.posts) {
      this.loading = false;
      this.showData = true;
    } else {
      this.loading = false;
      this.alert = true;
    }
  }

  setTitle(post) {
    this.post = post;
    localStorage.setItem('title', this.post.title);
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    this.router.navigate(['/tag/', this.tag]);
  }

  async addWithAsync() {
    const result1 = <number>await this.resolveAfter2Seconds(20);
    const result2 = <number>await this.resolveAfter2Seconds(30);
    this.additionAsyncResult = result1 + result2;
    console.log(`async result: ${this.additionAsyncResult}`);
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
}
