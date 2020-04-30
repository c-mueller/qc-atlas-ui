import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MissingEntityDialogComponent } from '../components/dialogs/missing-entity-dialog.component';
import { Sdk } from '../model/sdk.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  public callSnackBar(addedEntity: string): void {
    this.snackBar.open('Successfully added new ' + addedEntity, 'Ok', {
      duration: 2000,
    });
  }

  public createDialog(dialogComponent: any, entity: string, sdks?: Sdk[], tags?: Tag[]) {
    return this.dialog.open(dialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + entity, sdks: sdks, tags: tags}
    });
  }

  public createMissingEntityDialog(missingEntity: string, currentEntity: string) {
    this.dialog.open(MissingEntityDialogComponent, {
      width: '600px',
      data: {missingEntity: missingEntity, currentEntity: currentEntity}
    });
  }
}
