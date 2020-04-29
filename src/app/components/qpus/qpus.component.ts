import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';
import { Qpu } from '../../model/qpu.model';
import { JsonImportDialogComponent } from '../json-import-dialog/json-import-dialog.component';
import { QpuService } from '../../services/qpu.service';
import { Provider } from '../../model/provider.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MissingEntityDialogComponent } from '../json-import-dialog/missing-entity-dialog.component';
import { Sdk } from '../../model/sdk.model';
import { SdkService } from '../../services/sdk.service';

@Component({
  selector: 'app-qpus',
  templateUrl: './qpus.component.html',
  styleUrls: ['./qpus.component.scss']
})
export class QpusComponent implements OnInit, OnChanges {

  qpus: Qpu[] = [];
  sdks: Sdk[] = [];
  @Input() selectedProvider: Provider;

  displayedQpuColumns: string[] = ['name', 'id', 'maxGateTime', 'numberOfQubits', 't1'];

  constructor(private qpuService: QpuService, private snackBar: MatSnackBar, public dialog: MatDialog, private sdkService: SdkService) {
  }

  ngOnInit(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.getAllSdks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedProvider' in changes) {
      this.selectedProvider = changes.selectedProvider.currentValue;
      this.getQpuForProvider(this.selectedProvider.id);
    }
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      data => {
        this.sdks = data.sdkDtos;
      }
    );
  }

  getQpuForProvider(providerId: number): void {
    this.qpuService.getQpusForProvider(providerId).subscribe(
      data => {
        this.qpus = data.qpuDtoList;
      }
    );
  }

  createQpuWithJson(): void {
    if (this.sdks.length === 0) {
      this.createMissingEntityDialog();
    }
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new QPU'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.qpuService.createQpuWithJson(this.selectedProvider.id, dialogResult).subscribe(
          () => {
            this.getQpuForProvider(this.selectedProvider.id);
            this.callSnackbar();
          }
        );
      }
    });
  }

  createQpu(): void {
    if (this.sdks.length === 0) {
      this.createMissingEntityDialog();
    }
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
            this.callSnackbar();
          }
        );
      }
    });
  }

  private createMissingEntityDialog() {
    const missingDialog = this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: {missingEntity: 'sdk', currentEntity: 'qpus'}
    });
    return;
  }

  private createQpuFromDialogResult(dialogResult: any): Qpu {
    return {
      maxGateTime: dialogResult.maxGateTime,
      name: dialogResult.name,
      numberOfQubits: dialogResult.numberOfQubits,
      t1: dialogResult.t1
    };
  }

  private callSnackbar(): void {
    this.snackBar.open('Successfully added new QPU', 'Ok', {
      duration: 2000,
    });
  }

}
