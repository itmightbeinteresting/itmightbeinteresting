import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Creds } from 'private/private';
import { butterService } from '../services/butterCMS.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['../app.component.scss']
})
export class AddPostInfoComponent implements OnInit {
  creds: any = Creds;
  posts: any;
  slug: string;
  websiteUrl: string;
  selectedPost: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    console.log(sessionStorage.email);
    if (!sessionStorage.email || sessionStorage.email !== this.creds.email) {
      this.router.navigate(['/login']);
    }
    this.fetchPosts();
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
      console.log(err);
    });
  }

  selectPost(post) {
    this.selectedPost = post;
    this.websiteUrl = `https://itmightbeinteresting.com/${this.selectedPost.slug}`;
    console.log(this.websiteUrl.toString());
  }
}
