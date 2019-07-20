import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reroute',
  templateUrl: './url.component.html',
  styleUrls: [
    '../home/home.component.scss',
    '../app.component.scss'
  ]
})
export class RedirectComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigate(['/about']);
  }
}
