import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks: any[] = [];
  title = 'qc-atlas-ui';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.navLinks = [
      {
        label: 'Algorithms',
        link: './algorithms',
        index: 0,
      },
      {
        label: 'Execution environments',
        link: './execution-environments',
        index: 1,
      },
      {
        label: 'Publications',
        link: './publications',
        index: 2,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSettings(): void {}
}
