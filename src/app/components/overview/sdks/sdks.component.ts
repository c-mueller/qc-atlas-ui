import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SdkService } from '../../../services/sdk.service';
import { Sdk } from '../../../model/sdk.model';

@Component({
  selector: 'app-sdks',
  templateUrl: './sdks.component.html',
  styleUrls: ['./sdks.component.scss']
})
export class SdksComponent implements OnInit {

  activeIndex = 2;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  sdks: Array<Sdk> = [];
  selectedSdk: Sdk;

  overviewPage = 'overview/';
  selectedColor = 'primary';

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
        this.sdks = data.sdkDtos;
        if (!this.selectedSdk && this.sdks.length > 0) {
          this.sdkSelected(this.sdks[0]);
        }
      }
    );
  }

  getSdkColor(id: number): string {
    if (!this.selectedSdk) {
      return null;
    }
    if (id === this.selectedSdk.id) {
      return this.selectedColor;
    }
    return null;
  }

  sdkSelected(sdk: Sdk): void {
    this.selectedSdk = sdk;
  }
}
