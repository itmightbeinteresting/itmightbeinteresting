import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-posts-category',
    templateUrl: './posts-category.component.html'
})

export class PostsByCategoryComponent implements OnInit {
  categories: any;
  category: any;
  posts: any;
  tag: any;

  constructor(
    private router: Router
  ) { }

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

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    console.log(localStorage);
    this.router.navigate(['/tag/', this.tag]);
  }

}
