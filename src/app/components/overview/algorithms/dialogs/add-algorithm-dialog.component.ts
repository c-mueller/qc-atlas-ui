import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Tag } from '../../../../model/tag.model';
import { Parameters } from '../../../../model/parameters.model';
import { Link } from '../../../../model/link.model';
import { Content } from '../../../../model/content.model';

@Component({
  selector: 'app-add-sdk-dialog-component',
  templateUrl: 'add-algorithm-dialog.html'
})
export class AddAlgorithmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToInputParameters(data: any) {
    console.log(data);
  }

}

export interface DialogData {
  title: string;
  name: string;
  inputParameters: Parameters;
  content: Content;
  outputParameters: Parameters;
  tag: Tag;
  tags: Tag[];
  links: Link[];
}
