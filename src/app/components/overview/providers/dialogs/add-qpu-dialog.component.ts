import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-qpu-dialog-component',
  templateUrl: 'add-qpu-dialog.html'
})
export class AddQpuDialogComponent implements OnInit {

  qpuForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddQpuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  get name() {
    return this.qpuForm.get('name');
  }

  get maxGateTime() {
    return this.qpuForm.get('maxGateTime');
  }

  get numberOfQubits() {
    return this.qpuForm.get('numberOfQubits');
  }

  get t1() {
    return this.qpuForm.get('t1');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.qpuForm = new FormGroup({
      'name': new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      'maxGateTime': new FormControl(this.data.maxGateTime, [
        Validators.required
      ]),
      'numberOfQubits': new FormControl(this.data.numberOfQubits, [
        Validators.required
      ]),
      't1': new FormControl(this.data.t1, [
        Validators.required
      ])
    });

    this.dialogRef.beforeClosed().subscribe(
      () => {
        this.data.name = this.qpuForm.get('name').value;
        this.data.maxGateTime = this.qpuForm.get('maxGateTime').value;
        this.data.numberOfQubits = this.qpuForm.get('numberOfQubits').value;
        this.data.t1 = this.qpuForm.get('t1').value;
      }
    );
  }

}

export interface DialogData {
  title: string;
  name: string;
  maxGateTime: number;
  numberOfQubits: number;
  t1: number;
}
