import { Component, OnInit } from '@angular/core';
import { butterService } from '../services/butterCMS.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
})

export class TagsComponent implements OnInit {
  tags: any;

  constructor() { }

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

}
