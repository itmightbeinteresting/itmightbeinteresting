import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
})

export class TagsComponent implements OnInit {
  tags: any;
  tag: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    butterService.tag.list()
      .then((res) => {
        console.log(res.data.data);
        this.tags = res.data.data;
      });
  }

  selectTag(tag) {
    this.tag = tag.slug;
    localStorage.setItem('tag', this.tag);
    console.log(localStorage);
    this.router.navigate(['/tag/', this.tag]);
  }

}
