import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { DeleteParams } from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-software-platform-list',
  templateUrl: './software-platform-list.component.html',
  styleUrls: ['./software-platform-list.component.scss'],
})
export class SoftwarePlatformListComponent implements OnInit {
  @Input() softwarePlatforms: EntityModelSoftwarePlatformDto[];

  tableColumns = ['Name', 'Version', 'Licence', 'Link'];
  variableNames = ['name', 'version', 'licence', 'link'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor() {}

  ngOnInit(): void {}

  onElementClicked(softwarePlatform: EntityModelSoftwarePlatformDto): void {
    console.log(softwarePlatform);
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
