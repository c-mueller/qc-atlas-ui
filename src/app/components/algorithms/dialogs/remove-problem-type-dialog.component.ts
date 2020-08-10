import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EntityModelProblemTypeDto } from 'api-atlas/models';

@Component({
  selector: 'app-remove-problem-type-dialog',
  templateUrl: './remove-problem-type-dialog.component.html',
  styleUrls: ['./remove-problem-type-dialog.component.scss'],
})
export class RemoveProblemTypeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RemoveProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => {});
  }

  isRequiredDataMissing(): boolean {
    return this.data.selectedProblemTypes.length === 0;
  }
}

export interface DialogData {
  title: string;
  existingProblemTypes: EntityModelProblemTypeDto[];
  selectedProblemTypes: EntityModelProblemTypeDto[];
}
