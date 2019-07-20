import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['../app.component.scss']
})

export class TagsComponent implements OnInit {
  loading: boolean = true;
  tags: any;
  tag: any;
  showData: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.showData = false;
    this.getTags();
  }

  getTags() {
    butterService.tag.list()
      .then((res) => {
        this.tags = res.data.data;
        this.displayData();
      });
  }

  displayData() {
    if (this.tags) {
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
