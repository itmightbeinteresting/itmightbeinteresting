import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

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
  showData: boolean;
  tag: any;

  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.alert = false;
    this.showData = false;
    this.delayFetch();
  }

  async delayFetch() {
    const fetchDelay = setTimeout(() => {
      this.fetchPosts();
      return fetchDelay;
    }, 750);
  }

  async fetchPosts() {
    butterService.post.list({
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
      const loadDom = setTimeout(() => {
        this.loading = false;
        this.showData = true;
        return loadDom;
      }, 450);
    } else {
      this.alert = true;
    }
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    this.router.navigate(['/tag/', this.tag]);
  }
}
