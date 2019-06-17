import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-posts-tag',
    templateUrl: './posts-tag.component.html'
})

export class PostsByTagComponent implements OnInit {
  categories: any;
  tag: any;
  posts: any;

  constructor() { }

  ngOnInit() {
    this.tag = localStorage.tag;
    this.getPostsByTag();
  }

  getPostsByTag() {
    butterService.tag.retrieve(this.tag, {
        include: 'recent_posts'
      })
      .then((res) => {
        console.log(res.data.data);
        this.tag = res.data.data.name;
        this.posts = res.data.data.recent_posts;
      });
  }

}
