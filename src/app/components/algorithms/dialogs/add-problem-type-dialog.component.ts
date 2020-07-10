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
  problemTypeForm: FormGroup;
  parentProblemTypeControl: FormControl = new FormControl();
  problemTypeControl: FormControl = new FormControl();
  existingProblemTypes: EntityModelProblemTypeDto[];
  filteredProblemTyped: Observable<EntityModelProblemTypeDto[]>;
  filteredParentProblemTypes: Observable<EntityModelProblemTypeDto[]>;

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<AddProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): any {
    return this.problemTypeForm.get('name');
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
        this.filter();
      });

    this.problemTypeForm = new FormGroup({
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

  onParentTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.parentProblemType = type;
  }

  onProblemTypeSelect(type: EntityModelProblemTypeDto): void {
    this.problemTypeForm.setValue({ name: type.name });
    this.filter();
  }

  filter(): void {
    console.log('filter');
    this.filteredProblemTyped = this.problemTypeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterProblemTypes(value))
    );

    this.filteredParentProblemTypes = this.parentProblemTypeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterParents(value))
    );
  }

  filterProblemTypes(value: string): EntityModelProblemTypeDto[] {
    return this.existingProblemTypes.filter(
      (type) =>
        type.name.toLowerCase().startsWith(value.toLowerCase()) ||
        this.data.usedProblemTypes.some((usedType) => usedType.name === value)
    );
  }

  filterParents(value: string): EntityModelProblemTypeDto[] {
    return this.existingProblemTypes.filter(
      (type) =>
        type.name.toLowerCase().startsWith(value.toLowerCase()) ||
        value === this.name.value
    );
  }
}

export interface DialogData {
  title: string;
  name: string;
  usedProblemTypes: EntityModelProblemTypeDto[];
  parentProblemType: EntityModelProblemTypeDto;
}
