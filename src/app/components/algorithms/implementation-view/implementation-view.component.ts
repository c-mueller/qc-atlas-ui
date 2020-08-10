import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlgorithmDto,
  EntityModelComputingResourcePropertyDto,
  ImplementationDto,
} from 'api-atlas/models';
import {
  AlgorithmService,
  PublicationService,
  SoftwarePlatformService,
} from 'api-atlas/services';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';
import {
  DeleteParams,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { InputParameter } from '../impl-selection-criteria/impl-selection-criteria.component';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss'],
})
export class ImplementationViewComponent implements OnInit {
  isNisqUsed = environment.nisqAnalyzer;
  impl: ImplementationDto;
  algo: AlgorithmDto;
  softwarePlatformOptions: Option[];

  quantumResources: any[] = [];
  tableColumns = ['Name', 'Datatype', 'Description', 'Value'];
  variableNames = ['name', 'datatype', 'description', 'value'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [1, 2, 3],
    selectedAmount: 1,
  };

  links: BreadcrumbLink[] = [
    { heading: '', subHeading: '' },
    { heading: '', subHeading: '' },
  ];
  computeResourceProperties: EntityModelComputingResourcePropertyDto[] = [];

  placeholderInputParams: InputParameter[] = [
    {
      name: 'N',
      datatype: 'Integer',
    },
    {
      name: 'M',
      datatype: 'String',
    },
  ];

  placeholderPrologRule = 'executable(N, shor-general-qiskit) :- N > 2.';

  constructor(
    private algorithmService: AlgorithmService,
    private softwarePlatformService: SoftwarePlatformService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGeneral();
  }

  onChangeImpl(): void {
    this.algorithmService
      .updateImplementation({
        algoId: this.algo.id,
        implId: this.impl.id,
        body: this.impl,
      })
      .subscribe();
    // live refresh name
    this.links[1] = {
      heading: this.impl.name,
      subHeading: '',
    };
  }

  changeTab(tabNumber: number): void {
    // replace with switch case once quantum resource etc works in the backend
    if (tabNumber === 0) {
      this.loadGeneral();
    }
  }
  onAddQuantumResource(): void {}

  onDeleteQuantumResource($event: DeleteParams): void {}

  onDatalistConfigChanged(params: QueryParams): void {
    this.publicationService.getPublications(params).subscribe((data) => {
      console.log(data._embedded?.publications);
    });
  }

  onElementClicked(implementation: any): void {
    this.router.navigate([
      'algorithms',
      this.algo.id,
      'implementations',
      implementation.id,
    ]);
  }

  onPageChanged($event: string): void {}

  addComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .addComputingResource({
        algoId: this.algo.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  updateComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .updateComputingResource({
        algoId: this.algo.id,
        resourceId: property.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  deleteComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .deleteComputingResource({
        algoId: this.algo.id,
        resourceId: property.id,
      })
      .subscribe((e) => {
        this.computeResourceProperties = this.computeResourceProperties.filter(
          (elem: EntityModelComputingResourcePropertyDto) =>
            elem.id !== property.id
        );
        this.fetchComputeResourceProperties();
      });
  }

  fetchComputeResourceProperties(): void {
    this.algorithmService
      .getComputingResources({
        algoId: this.algo.id,
        implId: this.impl.id,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computingResourceProperties;
        }
      });
  }

  private loadGeneral(): void {
    this.softwarePlatformService.getSoftwarePlatforms().subscribe((list) => {
      const softwarePlatforms = list._embedded?.softwarePlatforms || [];
      this.softwarePlatformOptions = softwarePlatforms.map((sp) => ({
        label: sp.name,
        value: sp.id,
      }));
    });
    this.activatedRoute.params.subscribe(({ algoId, implId }) => {
      this.algorithmService.getAlgorithm({ algoId }).subscribe((algo) => {
        this.algo = algo;
        this.links[0] = {
          heading: this.algo.name,
          subHeading: this.algo.computationModel + ' Algorithm',
          link: '/algorithms/' + algoId,
        };
      });

      this.algorithmService
        .getImplementation({ algoId, implId })
        .subscribe((impl) => {
          this.impl = impl;
          this.links[1] = {
            heading: this.impl.name,
            subHeading: '',
          };
          this.fetchComputeResourceProperties();
        });
    });
  }
}
