import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-posts-category',
    templateUrl: './posts-category.component.html',
    styleUrls: ['../app.component.scss']
})

export class PostsByCategoryComponent implements OnInit {
  loading: boolean = true;
  categories: any;
  category: any;
  posts: any;
  tag: any;
  showData: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.showData = false;
    this.category = localStorage.category;
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    butterService.category.retrieve(this.category, {
        include: 'recent_posts'
      })
      .then((res) => {
        this.category = res.data.data.name;
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

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    this.router.navigate(['/tag/', this.tag]);
  }
}
