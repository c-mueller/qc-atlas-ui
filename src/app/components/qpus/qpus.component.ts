import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';
import { Qpu, QpuDtoList } from '../../model/qpu.model';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { QpuService } from '../../services/qpu.service';
import { Provider } from '../../model/provider.model';
import { MatDialog } from '@angular/material/dialog';
import { MissingEntityDialogComponent } from '../dialogs/missing-entity-dialog.component';
import { Sdk } from '../../model/sdk.model';
import { SdkService } from '../../services/sdk.service';
import { Util } from '../../util/Util';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-qpus',
  templateUrl: './qpus.component.html',
  styleUrls: ['./qpus.component.scss']
})
export class QpusComponent implements OnInit, OnChanges {

  qpus: Qpu[] = [];
  sdks: Sdk[] = [];
  @Input() selectedProvider: Provider;

  displayedQpuColumns: string[] = ['name', 'id', 'maxGateTime', 'numberOfQubits', 't1', 'supportedSdkIds'];

  constructor(private qpuService: QpuService, private snackbarService: SnackbarService,
              public dialog: MatDialog, private sdkService: SdkService) {
  }


  ngOnInit(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.getAllSdks();
  }

  getQpuForProvider(providerId: number): void {
    this.qpuService.getQpusForProvider(providerId).subscribe(
      data => {
        this.handleQpuResult(data);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedProvider' in changes) {
      this.selectedProvider = changes.selectedProvider.currentValue;
      this.getQpuForProvider(this.selectedProvider.id);
    }
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe(
      sdks => {
        this.sdks = sdks.sdkDtos;
      }
    );
  }

  getSupportedSdksForQpus(): void {
    for (const qpu of this.qpus) {
      for (const linkKey of this.getLinkKeysAsArray(qpu)) {
        if (this.isSupportedSdkLinkExisting(linkKey)) {
          this.handleSupportedSdkLink(qpu, qpu._links[linkKey].href);
        }
      }
    }
  }

  createQpuWithJson(): void {
    if (!this.isSdksExisting()) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '250px',
      data: {title: 'Import new QPU'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.qpuService.createQpuWithJson(this.selectedProvider.id, dialogResult).subscribe(
          () => {
            this.handleQpuCreationResult();
          }
        );
      }
    });
  }

  createQpu(): void {
    if (!this.isSdksExisting()) {
      this.createMissingEntityDialog();
      return;
    }
    const dialogRef = this.dialog.open(AddQpuDialogComponent, {
      width: '400px',
      data: {title: 'Add new QPU', sdks: this.sdks}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const qpu: Qpu = Util.createQpuFromDialogResult(dialogResult);
        this.qpuService.createQpu(this.selectedProvider.id, qpu).subscribe(
          () => {
            this.handleQpuCreationResult();
          }
        );
      }
    });
  }

  private handleQpuCreationResult(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.snackbarService.callSnackBar('QPU');
  }

  private isSupportedSdkLinkExisting(linkKey: string): boolean {
    return linkKey.includes('supportedSdk');
  }

  private handleSupportedSdkLink(qpu: Qpu, hrefToSupportedSdk: string): void {
    this.sdkService.getSdkByHref(hrefToSupportedSdk).subscribe(
      sdk => {
        Util.createSupportedSdkIdsIfNotExist(qpu);
        qpu.supportedSdkIds.push(sdk.id);
      }
    );
  }

  private getLinkKeysAsArray(qpu: Qpu) {
    return Object.keys(qpu._links);
  }

  private handleQpuResult(data: QpuDtoList): void {
    this.qpus = data.qpuDtoList;
    this.getSupportedSdksForQpus();
  }

  private isSdksExisting(): boolean {
    return this.sdks.length > 0;
  }

  private createMissingEntityDialog() {
    const missingDialog = this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: {missingEntity: 'sdks', currentEntity: 'qpus'}
    });
  }
}
