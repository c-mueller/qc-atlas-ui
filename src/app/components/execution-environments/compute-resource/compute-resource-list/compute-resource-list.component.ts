import { Component, Input, OnInit } from '@angular/core';
import { DeleteParams } from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-compute-resource-list',
  templateUrl: './compute-resource-list.component.html',
  styleUrls: ['./compute-resource-list.component.scss'],
})
export class ComputeResourceListComponent implements OnInit {
  @Input() computeResources: any[];

  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  constructor() {}

  ngOnInit(): void {}

  onElementClicked(computeResource): void {
    console.log(computeResource);
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
