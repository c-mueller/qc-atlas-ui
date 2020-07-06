import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';

@Component({
  selector: 'app-algorithm-publications-list',
  templateUrl: './algorithm-publications-list.component.html',
  styleUrls: ['./algorithm-publications-list.component.scss'],
})
export class AlgorithmPublicationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  publications: EntityModelPublicationDto[];
  variableNames: string[] = ['Title', 'Authors', 'DOI'];
  tableColumns: string[] = ['title', 'authors', 'doi'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.algorithmService
      .getPublications({ algoId: this.algorithm.id })
      .subscribe(
        (publications) => {
          if (publications._embedded) {
            this.publications = publications._embedded.publications;
          } else {
            this.publications = [];
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
