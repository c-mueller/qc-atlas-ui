import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() dataTitle: string;
  @Input() dataSubtitle: string;
  @Input() dataColumns: string[];
  @Input() usePagination: boolean;
  @Input() allowSelection: boolean;
  @Input() variableNames: string;
  @Output() selectionChange = new EventEmitter<any[]>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(this.dataColumns);
    if (this.allowSelection) {
      this.displayedColumns.push('Actions');
    }
  }

  isAllSelected() {
    return this.data.length === this.selection.selected.length;
  }

  // Toggle all check boxes
  masterToggle() {
    const isAllSelected = this.isAllSelected();
    this.data.forEach((element) => {
      this.changeSelection(element, isAllSelected ? false : true);
    });
    this.selectionChange.emit(this.selection.selected);
  }

  rowToggle(row: any, select: boolean) {
    this.changeSelection(row, !this.selection.isSelected(row));
    this.selectionChange.emit(this.selection.selected);
    console.log(this.dataTitle);
  }

  isArray(data): boolean {
    return Array.isArray(data);
  }

  printArray(dataArray: any) {
    let result = '';
    for (const data of dataArray) {
      result = result.concat(data) + ',';
    }
  }

  private changeSelection(row: any, select: boolean) {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }
}
