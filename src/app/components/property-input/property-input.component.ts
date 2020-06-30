import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-property-input',
  templateUrl: './property-input.component.html',
  styleUrls: ['./property-input.component.scss']
})
export class PropertyInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name: string = '';
  @Input() value: string = '';
  @Input() autosize: boolean = false;
  @Input() maxRows: number = 1;

  editable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEdit(): void {
    if (this.editable) {
      this.onSaveChanges.emit(this.value);
    }
    this.editable = !this.editable;
  }
}
