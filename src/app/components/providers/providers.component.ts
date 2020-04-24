import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../model/provider.model';
import { ProviderService } from '../../services/provider.service';
import { Qpu } from '../../model/qpu.model';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';
import { QpuService } from '../../services/qpu.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  selectedProvider: Provider;

  qpus: Qpu[] = [];

  isSelectedColor = 'primary';
  displayedQpuColumns: string[] = ['name', 'id', 'maxGateTime', 'numberOfQubits', 't1'];

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
    this.qpus = [];
    this.getQpuForProvider(provider.id);

  }

  getQpuForProvider(providerId: number): void {
    this.qpuService.getQpusforProvider(providerId).subscribe(
      data => {
        this.qpus = data.qpuDtoList;
      }
    );
  }

  createProviderWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '400px',
      data: {title: 'Import new Provider'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providerService.createProviderWithJson(result).subscribe(
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

  createQpuWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new QPU'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.qpuService.createQpuWithJson(this.selectedProvider.id, dialogResult).subscribe(
          () => {
            this.getQpuForProvider(this.selectedProvider.id);
            this.snackBar.open('Successfully added new QPU', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  createQpu(): void {
    const dialogRef = this.dialog.open(AddQpuDialogComponent, {
      width: '400px',
      data: {title: 'Add new QPU'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const qpu: Qpu = this.createQpuFromDialogResult(dialogResult);
        this.qpuService.createQpu(this.selectedProvider.id, qpu).subscribe(
          () => {
            this.getQpuForProvider(this.selectedProvider.id);
            this.snackBar.open('Successfully added new QPU', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  private createQpuFromDialogResult(dialogResult: any): Qpu {
    return {
      maxGateTime: dialogResult.maxGateTime,
      name: dialogResult.name,
      numberOfQubits: dialogResult.numberOfQubits,
      t1: dialogResult.t1
    };
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
