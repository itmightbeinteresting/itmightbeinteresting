import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  posts: any;
  tag: any;
  loading: boolean = true;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    butterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      this.posts = res.data.data;
      this.loading = false;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    console.log(localStorage);
    this.router.navigate(['/tag/', this.tag]);
  }

}
