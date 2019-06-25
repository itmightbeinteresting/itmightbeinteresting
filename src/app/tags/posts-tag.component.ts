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
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  showData: boolean;

  constructor() { }

  ngOnInit() {
    this.showData = false;
    this.step1 = true;
    this.progressLoaderOne();
    this.tag = localStorage.tag;
  }

  progressLoaderOne() {
    const stepOne = setTimeout(() => {
      this.step1 = false;
      this.step2 = true;
      this.getPostsByTag();
      return stepOne;
    }, 750);
  }

  progressLoaderTwo() {
    const stepTwo = setTimeout(() => {
      this.step3 = false;
      this.step4 = true;
      this.progressLoaderThree();
      return stepTwo;
    }, 750);
  }

  progressLoaderThree() {
    const stepThree = setTimeout(() => {
      this.displayData();
      return stepThree;
    }, 250);
  }

  getPostsByTag() {
    butterService.tag.retrieve(this.tag, {
        include: 'recent_posts'
      })
      .then((res) => {
        this.tag = res.data.data.name;
        this.posts = res.data.data.recent_posts;
        this.step2 = false;
        this.step3 = true;
        this.progressLoaderTwo();
      });
  }

  displayData() {
    if (this.posts) {
      this.step4 = false;
      this.loading = false;
      this.showData = true;
    }
  }
}
