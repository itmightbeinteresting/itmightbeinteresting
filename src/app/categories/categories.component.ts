import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../app.component.scss']
})

export class CategoriesComponent implements OnInit {
  categories: any;
  category: any;
  loading: boolean = true;
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
      this.getCategories();
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

  getCategories() {
    butterService.category.list()
      .then((res) => {
        this.categories = res.data.data;
        this.step2 = false;
        this.step3 = true;
        this.progressLoaderTwo();
      });
  }

  displayData() {
    if (this.categories) {
      this.step4 = false;
      this.loading = false;
      this.showData = true;
    }
  }

  selectCategory(category) {
    this.category = category.slug;
    localStorage.setItem('category', this.category);
    this.router.navigate(['/category/', this.category]);
  }

}
