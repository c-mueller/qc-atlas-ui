import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  activeIndex = 3;
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
