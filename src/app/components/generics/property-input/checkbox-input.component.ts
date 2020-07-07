import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() name = '';
  @Input() value = false;

  isBeingEdited = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this.value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
