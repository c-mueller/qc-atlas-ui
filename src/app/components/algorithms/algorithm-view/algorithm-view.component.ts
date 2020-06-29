import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit {
  algorithms: any[];
  selectedAlgorithms: any[];
  tableColumns = ['Name', 'Description', 'Authors', 'Format'];
  variableNames = ['description', 'authors', 'format'];

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

  adjustInput(): void {
    this.algorithms = [
      {
        name: 'Alg3',
        description: 'Alg 3 description',
        authors: ['Author Cu', 'Author Kr'],
        format: 'Boolean',
      },
      {
        name: 'Alg4',
        description: 'Alg 4 description',
        authors: ['Author Lr', 'Author Rl'],
        format: 'Double',
      },
    ];
  }

  selectionChanged(event) {
    this.selectedAlgorithms = event;
    console.log(this.selectedAlgorithms);
  }
}
