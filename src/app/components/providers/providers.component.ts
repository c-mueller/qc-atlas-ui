import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../model/provider.model';
import { ProviderService } from '../../services/provider.service';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';
import { QpuService } from '../../services/qpu.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  selectedProvider: Provider;

  isSelectedColor = 'primary';


  constructor(private router: Router, private providerService: ProviderService,
              private qpuService: QpuService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  getColorOfProviderButton(id: number): string {
    if (!this.selectedProvider) {
      return null;
    }
    if (id === this.selectedProvider.id) {
      return this.isSelectedColor;
    }
  }

  onProviderSelected(provider: Provider): void {
    this.selectedProvider = provider;
  }

  createProviderWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '400px',
      data: {title: 'Import new Provider'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.providerService.createProviderWithJson(dialogResult).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  createProvider(): void {
    const dialogRef = this.dialog.open(AddProviderDialogComponent, {
      width: '400px',
      data: {title: 'Add new Provider'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const provider: Provider = this.createProviderFromDialogResult(dialogResult);
        this.providerService.createProvider(provider).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  private createProviderFromDialogResult(dialogResult: any): Provider {
    return {
      name: dialogResult.name,
      accessKey: dialogResult.accessKey,
      secretKey: dialogResult.secretKey
    };
  }

  private getAllProviders(): void {
    this.providerService.getAllProviders().subscribe(
      providers => {
        this.providers = providers.providerDtoList;
        this.selectInitialProvider();
      }
    );
  }

  private selectInitialProvider() {
    if (!this.selectedProvider && this.providers.length > 0) {
      this.onProviderSelected(this.providers[0]);
    }
  }

  private processProviderResult(providerResult: Provider): void {
    this.providers.push(providerResult);
    this.selectedProvider = providerResult;
    this.callSnackBar();
  }

  private callSnackBar(): void {
    this.snackBar.open('Successfully added new Provider', 'Ok', {
      duration: 2000,
    });
  }
}
