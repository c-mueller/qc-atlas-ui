import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';
import { Sdk } from '../model/sdk.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isSelectedColor = 'primary';

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  public callSnackBar(addedEntity: string): void {
    this.snackBar.open('Successfully added new ' + addedEntity, 'Ok', {
      duration: 2000,
    });
  }

  public createDialog(
    dialogComponent: any,
    entity: string,
    sdks?: Sdk[],
    tags?: Tag[]
  ): any {
    return this.dialog.open(dialogComponent, {
      width: '400px',
      data: { title: 'Add new ' + entity, sdks, tags },
    });
  }

  public createMissingEntityDialog(
    missingEntity: string,
    currentEntity: string
  ): void {
    this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: { missingEntity, currentEntity },
    });
  }

  public getColorOfSelectedButton(selectedEntity: any, id: number): string {
    if (!selectedEntity) {
      return null;
    }
    if (id === selectedEntity.id) {
      return this.isSelectedColor;
    }
  }
}