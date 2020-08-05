import { Component, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { EntityModelComputeResourceDto } from 'api/models/entity-model-compute-resource-dto';

@Component({
  selector: 'app-execution-environment-search',
  templateUrl: './execution-environment-search.component.html',
  styleUrls: ['./execution-environment-search.component.scss'],
})
export class ExecutionEnvironmentSearchComponent implements OnInit {
  softwarePlatforms: EntityModelSoftwarePlatformDto[] = [];
  tableColumnsSoftwarePlatform = ['Name', 'Version', 'Licence', 'Link'];
  variableNamesSoftwarePlatform = ['name', 'version', 'licence', 'link'];

  cloudServices: EntityModelCloudServiceDto[] = [];
  tableColumnsCloudServices = [
    'Name',
    'Provider',
    'Description',
    'CostModel',
    'URL',
  ];
  variableNamesCloudServices = [
    'name',
    'provider',
    'description',
    'costModel',
    'URL',
  ];

  computeResources: EntityModelComputeResourceDto[] = [];
  tableColumnsComputeResources = [
    'Name',
    'Vendor',
    'Technology',
    'Quantum Computation Model',
  ];
  variableNamesComputeResources = [
    'name',
    'vendor',
    'technology',
    'quantumComputationModel',
  ];

  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10],
    selectedAmount: 10,
  };

  searchText = '';

  constructor() {}

  ngOnInit(): void {}

  onElementClicked(event): void {
    console.log(event, this.searchText);
  }

  onDatalistConfigChanged(event): void {
    console.log(event);
  }

  onPageChanged(event): void {
    console.log(event);
  }
}
