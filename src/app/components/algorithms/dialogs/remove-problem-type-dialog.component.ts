import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityModelProblemTypeDto } from 'api/models/entity-model-problem-type-dto';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-problem-type-dialog',
  templateUrl: './remove-problem-type-dialog.component.html',
  styleUrls: ['./remove-problem-type-dialog.component.scss'],
})
export class RemoveProblemTypeDialogComponent implements OnInit {
  ProblemTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RemoveProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): any {
    return this.ProblemTypeForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.ProblemTypeForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.data.selectedProblemTypes.length === 0;
  }
}

export interface DialogData {
  title: string;
  name: string;
  existingProblemTypes: EntityModelProblemTypeDto[];
  selectedProblemTypes: EntityModelProblemTypeDto[];
}
