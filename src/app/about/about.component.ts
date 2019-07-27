import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle('About Us | It Might Be Interesting');
  }

  ngOnInit() {}
}
