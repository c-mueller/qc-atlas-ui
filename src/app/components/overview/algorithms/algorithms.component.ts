import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  activeIndex = 0;
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
