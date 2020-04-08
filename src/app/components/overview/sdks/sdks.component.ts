import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sdks',
  templateUrl: './sdks.component.html',
  styleUrls: ['./sdks.component.scss']
})
export class SdksComponent implements OnInit {

  activeIndex = 2;
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
