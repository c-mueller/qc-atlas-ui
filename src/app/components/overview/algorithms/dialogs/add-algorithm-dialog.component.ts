import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { Tag } from '../../../../model/tag.model';
import { Parameters } from '../../../../model/parameters.model';
import { Link } from '../../../../model/link.model';
import { Content } from '../../../../model/content.model';
import { AddParameterDialogComponent } from './add-parameter-dialog.component';
import { Parameter } from '../../../../model/parameter.model';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-add-sdk-dialog-component',
  templateUrl: 'add-algorithm-dialog.html'
})
export class AddAlgorithmDialogComponent {

  inputParameters: Parameters = new Parameters();
  outputParameters: Parameters = new Parameters();

  @ViewChild('inputTable') tableIn: MatTable<any>;
  @ViewChild('outputTable') tableOut: MatTable<any>;

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
    this.inputParameters.parameters = [];
    this.outputParameters.parameters = [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addParameter(type: string) {
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '400px',
      data: {title: 'Add new ' + type + ' parameter'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const parameter: Parameter = {
          name: result.name,
          description: result.description,
          type: result.type,
          restriction: result.restriction
        };
        type === 'input' ? this.addToInputParams(parameter) : this.addToOutputParams(parameter);
        if (this.tableIn) {
          this.tableIn.renderRows();
        }
        if (this.tableOut) {
          this.tableOut.renderRows();
        }
      }
    });
  }

  addToInputParams(parameter: Parameter) {
    this.inputParameters.parameters.push(parameter);
    this.data.inputParameters = this.inputParameters;
  }

  addToOutputParams(parameter: Parameter) {
    this.outputParameters.parameters.push(parameter);
    this.data.outputParameters = this.outputParameters;
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
