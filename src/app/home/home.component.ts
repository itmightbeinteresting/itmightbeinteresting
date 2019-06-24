import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  posts: any;
  tag: any;
  loading: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  showData: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.showData = false;
    this.step1 = true;
    this.progressLoaderOne();
  }

  progressLoaderOne() {
    const stepOne = setTimeout(() => {
      this.step1 = false;
      this.step2 = true;
      this.fetchPosts();
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

  fetchPosts() {
    butterService.post.list({
      page: 1,
      page_size: 10
    })
    .then((res) => {
      this.posts = res.data.data;
      this.step2 = false;
      this.step3 = true;
      this.progressLoaderTwo();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  displayData() {
    if (this.posts) {
      this.step4 = false;
      // this.loading = false;
      this.showData = true;
    }
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    console.log(localStorage);
    this.router.navigate(['/tag/', this.tag]);
  }

}
