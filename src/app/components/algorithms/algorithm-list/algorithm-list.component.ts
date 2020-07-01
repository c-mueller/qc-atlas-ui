import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.scss'],
})
export class AlgorithmListComponent implements OnInit {
  algorithms: any[] = [];
  selectedAlgorithms: any[] = [];
  tableColumns = ['Name', 'Description', 'Authors', 'Format'];
  variableNames = ['name', 'description', 'authors', 'format'];
  sortData: any = {
    active: '',
    direction: '',
  };
  pagingInfo = {
    _links: {
      prev: {
        href: 'http://previousPage',
      },
      next: {
        href: 'http://nextPage',
      },
      first: {
        href: 'http://firstPage',
      },
      last: {
        href: 'http://lastPage',
      },
      self: {
        href: 'http://currentPage',
      },
    },
    page: {
      size: 10,
      totalElements: 2,
      totalPages: 5,
      number: 1,
    },
  };
  paginatorConfig = {
    amountChoices: [10, 20, 30],
    selectedAmount: 10,
  };
  constructor() {}

  ngOnInit(): void {
    this.algorithms = [
      {
        name: 'Alg1',
        description: 'Alg 1 description',
        authors: [
          'Author Ab',
          'Author Bc',
          'Author De',
          'Author Ef',
          'Author Fg',
        ],
        format: 'String',
      },
      {
        name: 'Alg2',
        description: 'Alg 2 description',
        authors: ['Author Ab', 'Author Bc'],
        format: 'Integer',
      },
    ];
  }

  adjustInput(): void {}

  selectionChanged(event) {
    this.selectedAlgorithms = event;
    console.log(this.selectedAlgorithms);
  }

  pageChanged(event) {
    const newPageUrl = event;
    console.log(newPageUrl);
  }

  dataSorted(event) {
    this.sortData = event;
    console.log(this.sortData);
  }

  paginatorConfigChanged(event) {
    this.paginatorConfig = event;
    console.log(this.paginatorConfig);
  }

  deleteElements() {
    console.log('Delete Elements: ');
    console.log(this.selectedAlgorithms);
  }

  addElement() {
    console.log('Add Element');
  }

  searchElement(event) {
    const searchText = event;
    console.log(searchText);
  }
}
