import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-import-dialog-component',
  templateUrl: 'import-dialog.html',
})
export class ImportDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  title: string;
  json: string;
}
