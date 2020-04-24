import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];
  activeIndex: number;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  tabIndexChanged(index: number): void {
    this.activeIndex = index;
    localStorage.setItem('activeIndex', JSON.stringify(this.activeIndex));
    this.router.navigate([this.tabs[this.activeIndex]], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.activeIndex = JSON.parse(localStorage.getItem('activeIndex'));
  }
}
