import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit {
  algorithms: any[];
  selectedAlgorithms: any[];
  usePagination = false;
  allowSelection = true;
  tableColumns = ['name', 'description'];
  algorithmTitleVar = 'name';
  algorithmSubtitleVar = 'computationModel';

  constructor() {}

  ngOnInit(): void {
    this.algorithms = [
      {
        name: 'Alg1',
        description: 'Alg 1 description',
      },
      {
        name: 'Alg2',
        description: 'Alg 2 description',
      },
    ];
  }

  adjustInput(): void {
    this.algorithms = [
      {
        name: 'Alg3',
        description: 'Alg 3 description',
      },
      {
        name: 'Alg4',
        description: 'Alg 4 description',
      },
    ];
  }

  selectionChanged(event) {
    this.selectedAlgorithms = event;
    console.log(this.selectedAlgorithms);
  }
}
