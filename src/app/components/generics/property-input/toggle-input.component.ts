import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss'],
})
export class ToggleInputComponent implements OnInit {
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
