import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../../model/provider.model';
import { ProviderService } from '../../../services/provider.service';
import { Qpu } from '../../../model/qpu.model';
import { ImportDialogComponent } from '../../importer/import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  activeIndex = 1;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];

  providers: Array<Provider> = [];
  selectedProvider: Provider;
  qpus: Array<Qpu> = [];
  selectedColor = 'primary';

  displayedQpuColumns: string[] = ['name', 'id', 'maxGateTime', 'numberOfQubits', 't1'];

  constructor(private router: Router, private providerService: ProviderService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate([environment.OVERVIEW_PAGE + this.tabs[this.activeIndex]]);
  }

  getProviderColor(id: number): string {
    if (!this.selectedProvider) {
      return null;
    }
    if (id === this.selectedProvider.id) {
      return this.selectedColor;
    }
    return null;
  }

  providerSelected(provider: Provider): void {
    this.selectedProvider = provider;
    this.qpus = [];
    this.getQPUForProvider(provider.id);

  }

  getQPUForProvider(providerId: number): void {
    this.providerService.getQPUforProvider(providerId).subscribe(
      data => {
        this.qpus = data.qpuDtoList;
      }
    );
  }

  importJSON(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new providers'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providerService.createProvider(result).subscribe(
          data => {
            this.providers.push(data);
            this.selectedProvider = data;
            this.snackBar.open('Successfully added new provider', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addProvider(): void {
    const dialogRef = this.dialog.open(AddProviderDialogComponent, {
      width: '400px',
      data: {title: 'Add new Provider'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const provider: Provider = {
          name: result.name,
          accessKey: result.accessKey,
          secretKey: result.secretKey
        };
        this.providerService.addProvider(provider).subscribe(
          data => {
            this.providers.push(data);
            this.selectedProvider = data;
            this.snackBar.open('Successfully added new provider', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  importQpusJSON(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new QPUs'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.providerService.createQPU(this.selectedProvider.id, result).subscribe(
          () => {
            this.getQPUForProvider(this.selectedProvider.id);
            this.snackBar.open('Successfully added new QPUs', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addQpu(): void {
    const dialogRef = this.dialog.open(AddQpuDialogComponent, {
      width: '400px',
      data: {title: 'Add new QPU'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const qpu: Qpu = {
          maxGateTime: result.maxGateTime,
          name: result.name,
          numberOfQubits: result.numberOfQubits,
          t1: result.t1
        };
        this.providerService.addQPU(this.selectedProvider.id, qpu).subscribe(
          () => {
            this.getQPUForProvider(this.selectedProvider.id);
            this.snackBar.open('Successfully added new QPUs', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  private getAllProviders(): void {
    this.providerService.getAllProviders().subscribe(
      data => {
        this.providers = data.providerDtoList;
        if (!this.selectedProvider && this.providers.length > 0) {
          this.providerSelected(this.providers[0]);
        }
      }
    );
  }
}
