import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../../model/provider.model';
import { ProviderService } from '../../../services/provider.service';
import { Qpu } from '../../../model/qpu.model';
import { ImportDialogComponent } from '../../importer/import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  displayedQpuColumns: string[] = ['id', 'maxGateTime', 'numberOfQubits', 't1', 'name'];

  constructor(private router: Router, private providerService: ProviderService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate(['overview/' + this.tabs[this.activeIndex]]);
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
    this.providerService.getQPUforProvider(provider.id).subscribe(
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
            this.snackBar.open('Successfully added new provider', 'Ok', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  addProvider(): void {
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
