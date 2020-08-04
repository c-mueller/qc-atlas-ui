import { Component, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';

@Component({
  selector: 'app-cloud-service-view',
  templateUrl: './cloud-service-view.component.html',
  styleUrls: ['./cloud-service-view.component.scss'],
})
export class CloudServiceViewComponent implements OnInit {
  cloudService: EntityModelCloudServiceDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  constructor() {}

  ngOnInit(): void {}
}
