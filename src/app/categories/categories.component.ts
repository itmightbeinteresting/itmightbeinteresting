import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {
  categories: any;
  category: any;
  loading: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    butterService.category.list()
      .then((res) => {
        console.log(res.data.data);
        this.categories = res.data.data;
      });
  }

  selectCategory(category) {
    this.category = category.slug;
    localStorage.setItem('category', this.category);
    console.log(localStorage);
    this.router.navigate(['/category/', this.category]);
  }

}
