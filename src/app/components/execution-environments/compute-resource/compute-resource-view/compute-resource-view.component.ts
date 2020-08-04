import { Component, OnInit } from '@angular/core';
import { EntityModelComputeResourceDto } from 'api/models/entity-model-compute-resource-dto';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';

@Component({
  selector: 'app-compute-resource-view',
  templateUrl: './compute-resource-view.component.html',
  styleUrls: ['./compute-resource-view.component.scss'],
})
export class ComputeResourceViewComponent implements OnInit {
  computeResource: EntityModelComputeResourceDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  constructor() {}

  ngOnInit(): void {}
}
