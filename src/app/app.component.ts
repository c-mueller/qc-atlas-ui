import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qc-atlas-ui';
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];
  activeIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  tabIndexChanged(index: number): void {
    this.activeIndex = index;
    this.router.navigate([this.tabs[this.activeIndex]], {relativeTo: this.route});
  }
}
