import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { DeleteParams } from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-cloud-service-list',
  templateUrl: './cloud-service-list.component.html',
  styleUrls: ['./cloud-service-list.component.scss'],
})
export class CloudServiceListComponent implements OnInit {
  @Input() cloudServices: EntityModelCloudServiceDto[];

  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'URL'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor() {}

  ngOnInit(): void {}

  onElementClicked(cloudService): void {
    console.log(cloudService);
  }

  onAddElement(): void {}

  onDeleteElements(deleteParams: DeleteParams): void {
    console.log(deleteParams);
  }

  onDatalistConfigChanged(event): void {
    console.log(event);
  }

  onPageChanged(event): void {
    console.log(event);
  }
}
