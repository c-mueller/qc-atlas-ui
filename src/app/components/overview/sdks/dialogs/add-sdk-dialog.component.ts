import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-sdk-dialog-component',
  templateUrl: 'add-sdk-dialog.html'
})
export class AddSdkDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddSdkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  name: string;
}
