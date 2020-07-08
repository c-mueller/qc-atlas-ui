import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntityModelApplicationAreaDto } from 'api/models/entity-model-application-area-dto';
import { ApplicationAreasService } from 'api/services/application-areas.service';
import { EntityModelProblemTypeDto } from 'api/models/entity-model-problem-type-dto';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit, OnDestroy {
  tabOptions: string[] = [
    'General',
    'Implementations',
    'Related algorithms',
    'Publications',
    'Discussion',
  ];

  testTags: string[] = ['test tag', 'quantum', 'algorithm'];

  algorithm: EntityModelAlgorithmDto;
  applicationAreas: EntityModelApplicationAreaDto[];
  problemTypes: EntityModelProblemTypeDto[];
  problemTypesTrees: EntityModelProblemTypeDto[][];

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;

  constructor(
    private algorithmService: AlgorithmService,
    private applicationAreasService: ApplicationAreasService,
    private problemTypeService: ProblemTypeService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ algoId }) => {
      this.algorithmService.getAlgorithm({ algoId }).subscribe(
        (algo: EntityModelAlgorithmDto) => {
          this.algorithm = algo;
          this.links[0] = {
            heading: this.algorithm.name,
            subHeading: this.algorithm.computationModel + ' Algorithm',
          };
          this.getApplicationAreasForAlgorithm(algoId);
          this.getProblemTypesForAlgorithm(algoId);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getApplicationAreasForAlgorithm(algoId: string): void {
    this.algorithmService.getApplicationAreas({ algoId }).subscribe(
      (areas) => {
        if (areas._embedded) {
          this.applicationAreas = areas._embedded.applicationAreas;
        } else {
          this.applicationAreas = [];
        }
      },
      (error) => {
        console.log(error);
        this.applicationAreas = [];
      }
    );
  }

  getProblemTypesForAlgorithm(algoId: string): void {
    this.algorithmService.getProblemTypes({ algoId }).subscribe(
      (problems) => {
        if (problems._embedded) {
          this.problemTypes = problems._embedded.problemTypes;
          this.problemTypes.forEach((problemType) =>
            this.addProblemTypeParentTree(problemType.id)
          );
        } else {
          this.problemTypes = [];
          this.problemTypesTrees = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProblemTypeParentTree(id: string): void {
    this.problemTypeService.getProblemTypeParentList({ id }).subscribe(
      (tree) => {
        this.problemTypesTrees = [];
        if (tree._embedded) {
          this.problemTypesTrees.push(tree._embedded.problemTypes);
          console.log(this.problemTypesTrees);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addTag(): void {
    console.log('add tag');
    // TODO: create tag dialog
  }

  removeTag(tag: string): void {
    const index = this.testTags.indexOf(tag);
    if (index !== -1) {
      this.testTags.splice(index, 1);
    }
  }

  updateAlgorithmField(event: { field; value }): void {
    this.algorithm[event.field] = event.value;
    this.algorithmService
      .updateAlgorithm({ algoId: this.algorithm.id, body: this.algorithm })
      .subscribe(
        (algo) => {
          this.algorithm = algo;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addApplicationArea(applicationArea: string): void {
    this.applicationAreasService
      .createApplicationArea({ body: { name: applicationArea } })
      .subscribe((area) => {
        this.algorithmService
          .addApplicationArea({
            algoId: this.algorithm.id,
            body: {
              id: area.id,
              name: area.name,
            },
          })
          .subscribe((areas) => {
            if (areas._embedded) {
              this.applicationAreas = areas._embedded.applicationAreas;
            }
          });
      });
  }

  removeApplicationArea(applicationArea: EntityModelApplicationAreaDto): void {
    this.algorithmService
      .deleteReferenceToApplicationArea({
        algoId: this.algorithm.id,
        applicationAreaId: applicationArea.id,
      })
      .subscribe(
        (res) => {
          this.applicationAreasService
            .deleteApplicationArea({ id: applicationArea.id })
            .subscribe(
              (area) => {},
              (error) => {
                console.log(error);
              }
            );
          this.getApplicationAreasForAlgorithm(this.algorithm.id);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
