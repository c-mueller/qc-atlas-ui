import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EntityModelProblemTypeDto } from 'api/models/entity-model-problem-type-dto';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-problem-type-dialog',
  templateUrl: './add-problem-type-dialog.component.html',
  styleUrls: ['./add-problem-type-dialog.component.scss'],
})
export class AddProblemTypeDialogComponent implements OnInit {
  ProblemTypeForm: FormGroup;
  parentProblemTypeControl: FormControl = new FormControl();
  existingProblemTypes: EntityModelProblemTypeDto[];
  filteredProblemTypes: Observable<EntityModelProblemTypeDto[]>;

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<AddProblemTypeDialogComponent>,
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
    this.data.parentProblemType = { name: '' };
    this.problemTypeService
      .getProblemTypes1({ page: 0, size: 1000 })
      .subscribe((types) => {
        if (types._embedded) {
          this.existingProblemTypes = types._embedded.problemTypes;
        } else {
          this.existingProblemTypes = [];
        }
        this.filteredProblemTypes = this.parentProblemTypeControl.valueChanges.pipe(
          startWith(''),
          map((value) => this.filter(value))
        );
      });

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
    return this.name.errors?.required;
  }

  onTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.parentProblemType = type;
  }

  filter(value: string): EntityModelProblemTypeDto[] {
    return this.existingProblemTypes.filter((type) =>
      type.name.toLowerCase().startsWith(value.toLowerCase())
    );
  }
}

export interface DialogData {
  title: string;
  name: string;
  parentProblemType: EntityModelProblemTypeDto;
}
