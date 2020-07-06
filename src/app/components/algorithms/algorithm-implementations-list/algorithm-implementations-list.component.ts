import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';

@Component({
  selector: 'app-algorithm-implementations-list',
  templateUrl: './algorithm-implementations-list.component.html',
  styleUrls: ['./algorithm-implementations-list.component.scss'],
})
export class AlgorithmImplementationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  implementations: EntityModelImplementationDto[];
  variableNames: string[] = ['Name', 'Description', 'Dependencies'];
  tableColumns: string[] = ['name', 'description', 'dependencies'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.algorithmService
      .getImplementations({ algoId: this.algorithm.id })
      .subscribe(
        (impls) => {
          if (impls._embedded) {
            this.implementations = impls._embedded.implementations;
          } else {
            this.implementations = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onAddElement(): void {}

  onDeleteElements($event): void {}

  onDatalistConfigChanged($event): void {}

  onPageChanged($event): void {}
}
