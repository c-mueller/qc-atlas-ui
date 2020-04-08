import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  activeIndex = 1;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate(['overview/' + this.tabs[this.activeIndex]]);
  }
}
