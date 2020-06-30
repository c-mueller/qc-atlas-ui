import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MdbTableDirective } from 'angular-bootstrap-md';

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
  @Input() variableNames: string[];
  @Output() selectionChange = new EventEmitter<any[]>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  searchText = '';
  previous: string;

  constructor() {}

  ngOnInit(): void {
    this.mdbTable.setDataSource(this.data);
    this.previous = this.mdbTable.getDataSource();
  }

  @HostListener('input')
  oninput() {
    this.searchItems();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.data = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.data = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
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
