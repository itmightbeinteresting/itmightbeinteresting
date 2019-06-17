import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  posts: any;
  headlines: any;
  tags: any;

  constructor() { }

  ngOnInit() {
    this.fetchPosts();
    // this.fetchTags();
    // this.fetchHeadline();
  }

  // private fetchHeadline() {
  //   butterService.content.retrieve(['homepage_headline'])
  //     .then((res) => {
  //       console.log('Headline from ButterCMS');
  //       console.log(res);
  //       this.headlines = res.data.data;
  //     });
  // }

  fetchPosts() {
    butterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      console.log('Content from ButterCMS');
      console.log(res);
      this.posts = res.data.data;
    });
  }

}
