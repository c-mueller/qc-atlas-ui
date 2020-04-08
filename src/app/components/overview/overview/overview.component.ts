import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  activeIndex = 0;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.navigate();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.navigate();
  }

  navigate(): void {
    this.router.navigate(['overview/' + this.tabs[this.activeIndex]]);
  }

}
