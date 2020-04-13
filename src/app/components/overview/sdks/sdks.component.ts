import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SdkService } from '../../../services/sdk.service';

@Component({
  selector: 'app-sdks',
  templateUrl: './sdks.component.html',
  styleUrls: ['./sdks.component.scss']
})
export class SdksComponent implements OnInit {

  activeIndex = 2;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  overviewPage = 'overview/';

  constructor(private router: Router, private sdkService: SdkService) {
  }

  ngOnInit(): void {
    this.getAllSdks();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate([this.overviewPage + this.tabs[this.activeIndex]]);
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
