import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-tag-dialog-component',
  templateUrl: 'add-tag-dialog.html'
})
export class AddTagDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  key: string;
  value: string;
}
