import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {
  categories: any;

  constructor() { }

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

}
