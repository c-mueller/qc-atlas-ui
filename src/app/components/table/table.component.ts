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
  @Input() allowSelection: boolean;
  @Input() allowSearch: boolean;
  @Input() variableNames: string[];
  @Input() pagination: any;
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<string>();
  @Output() deleteElements = new EventEmitter<void>();
  @Output() addElement = new EventEmitter<void>();
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  selection = new SelectionModel<any>(true, []);
  searchText = '';
  previous: string;

  constructor() {}

  @HostListener('input')
  oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.mdbTable.setDataSource(this.data);
    this.previous = this.mdbTable.getDataSource();
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

  changePage(link: string) {
    this.pageChange.emit(link);
  }

  onDelete() {
    this.deleteElements.emit();
  }

  onAdd() {
    this.addElement.emit();
  }

  private changeSelection(row: any, select: boolean) {
    if (select !== this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
  }
}
