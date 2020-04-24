import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SdkService } from '../../services/sdk.service';
import { Sdk } from '../../model/sdk.model';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
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

  isSelectedColor = 'primary';

  constructor(private router: Router, private sdkService: SdkService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllSdks();
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

  getColorOfSdkButton(id: number): string {
    if (!this.selectedSdk) {
      return null;
    }
    if (id === this.selectedSdk.id) {
      return this.isSelectedColor;
    }
  }

  sdkSelected(sdk: Sdk): void {
    this.selectedSdk = sdk;
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '400px',
      data: {title: 'Import new SDK'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.sdkService.createSdkWithJson(dialogResult).subscribe(
          sdkResult => {
            this.processSdkResult(sdkResult);
          }
        );
      }
    });
  }

  addSdk(): void {
    const dialogRef = this.dialog.open(AddSdkDialogComponent, {
      width: '400px',
      data: {title: 'Add new SDK'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const sdk: Sdk = this.createSdkFromDialogResult(dialogResult);
        this.sdkService.createSdk(sdk).subscribe(
          sdkResult => {
            this.processSdkResult(sdkResult);
          });
      }
    });
  }

  private createSdkFromDialogResult(dialogResult: any): Sdk {
    return {
      name: dialogResult.name
    };
  }

  private processSdkResult(sdkResult: Sdk): void {
    this.sdks.push(sdkResult);
    this.selectedSdk = sdkResult;
    this.callSnackBar();
  }

  private callSnackBar(): void {
    this.snackBar.open('Successfully added new SDK', 'Ok', {
      duration: 2000,
    });
  }
}
