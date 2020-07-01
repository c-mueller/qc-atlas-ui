import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';

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
  routingVariable = ['id'];
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
  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.algorithms = [
      {
        id: '261642e3-da41-4c91-b1d9-b9ce40b698a9',
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
        id: '261642e3-da41-4c91-b1d9-b9ce40b698a7',
        name: 'Alg2',
        description: 'Alg 2 description',
        authors: ['Author Ab', 'Author Bc'],
        format: 'Integer',
      },
    ];
    this.getAlgorithms();
  }

  getAlgorithms(): void {
    // TODO: Fix generated services
    this.algorithmService.getAlgorithms().subscribe((data) => {
      const algorithms = data._embedded.algorithmDtoes;
      const page = data.page;
      console.log(algorithms);
      console.log(page);
    });
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
