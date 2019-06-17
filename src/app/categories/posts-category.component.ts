import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-posts-category',
    templateUrl: './posts-category.component.html'
})

export class PostsByCategoryComponent implements OnInit {
  categories: any;
  category: any;
  posts: any;

  constructor() { }

  ngOnInit() {
    this.category = localStorage.category;
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    butterService.category.retrieve(this.category, {
        include: 'recent_posts'
      })
      .then((res) => {
        console.log(res.data.data);
        this.category = res.data.data.name;
        this.posts = res.data.data.recent_posts;
      });
  }

}
