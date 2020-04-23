import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-provider-dialog-component',
  templateUrl: 'add-provider-dialog.html'
})
export class AddProviderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  title: string;
  name: string;
  accessKey: string;
  secretKey: string;
}
