import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-posts-tag',
    templateUrl: './posts-tag.component.html',
    styleUrls: ['../app.component.scss']
})

export class PostsByTagComponent implements OnInit {
  loading: boolean = true;
  categories: any;
  tag: any;
  posts: any;
  showData: boolean;

  constructor() { }

  ngOnInit() {
    this.showData = false;
    this.tag = localStorage.tag;
    this.getPostsByTag();
  }

  getPostsByTag() {
    butterService.tag.retrieve(this.tag, {
        include: 'recent_posts'
      })
      .then((res) => {
        this.tag = res.data.data.name;
        this.posts = res.data.data.recent_posts;
        this.displayData();
      });
  }

  displayData() {
    if (this.posts) {
      this.loading = false;
      this.showData = true;
    }
  }
}
