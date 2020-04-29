import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SdkService } from '../../services/sdk.service';
import { Sdk } from '../../model/sdk.model';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSdkDialogComponent } from './dialogs/add-sdk-dialog.component';

@Component({
  selector: 'app-sdks',
  templateUrl: './sdks.component.html',
  styleUrls: ['./sdks.component.scss']
})
export class SdksComponent implements OnInit {

  sdks: Sdk[] = [];
  selectedSdk: Sdk;
  firstEntry = 0;

  isSelectedColor = 'primary';

  constructor(private router: Router, private sdkService: SdkService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  private static createSdkFromDialogResult(dialogResult: any): Sdk {
    return {
      name: dialogResult.name
    };
  }

  ngOnInit(): void {
    this.getAllSdks();
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      sdkData => {
        this.sdks = sdkData.sdkDtos;
        this.selectInitialSdk();
      }
    );
  }

  makeSelectedSdk(sdk: Sdk): void {
    this.selectedSdk = sdk;
  }

  getColorOfSdkButton(id: number): string {
    if (this.isNoSdkSelected()) {
      return null;
    }
    if (id === this.selectedSdk.id) {
      return this.isSelectedColor;
    }
  }

  createSdkWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '400px',
      data: {title: 'Import new SDK'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.sdkService.createSdkWithJson(dialogResult).subscribe(
          sdkResult => {
            this.handleSdkCreationResult(sdkResult);
          }
        );
      }
    });
  }

  createSdk(): void {
    const dialogRef = this.dialog.open(AddSdkDialogComponent, {
      width: '400px',
      data: {title: 'Add new SDK'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const sdk: Sdk = SdksComponent.createSdkFromDialogResult(dialogResult);
        this.sdkService.createSdk(sdk).subscribe(
          sdkResult => {
            this.handleSdkCreationResult(sdkResult);
          });
      }
    });
  }

  private selectInitialSdk(): void {
    if (this.isNoSdkSelected()) {
      this.makeSelectedSdk(this.sdks[this.firstEntry]);
    }
  }

  private isNoSdkSelected(): boolean {
    return !this.selectedSdk && this.sdks.length > 0;
  }

  private handleSdkCreationResult(sdkResult: Sdk): void {
    this.sdks.push(sdkResult);
    this.makeSelectedSdk(sdkResult);
    this.callSnackBar();
  }

  private callSnackBar(): void {
    this.snackBar.open('Successfully added new SDK', 'Ok', {
      duration: 2000,
    });
  }
}
