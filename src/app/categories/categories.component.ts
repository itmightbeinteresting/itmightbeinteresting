import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../app.component.scss']
})

export class CategoriesComponent implements OnInit {
  categories: any;
  category: any;
  loading: boolean = true;
  showData: boolean;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Categories | It Might Be Interesting');
  }

  ngOnInit() {
    this.showData = false;
    this.getCategories();
  }

  getCategories() {
    butterService.category.list()
      .then((res) => {
        this.categories = res.data.data;
        this.displayData();
      });
  }

  displayData() {
    if (this.categories) {
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
