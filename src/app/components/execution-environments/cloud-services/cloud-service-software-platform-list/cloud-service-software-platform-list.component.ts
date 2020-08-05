import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';

@Component({
  selector: 'app-cloud-service-software-platform-list',
  templateUrl: './cloud-service-software-platform-list.component.html',
  styleUrls: ['./cloud-service-software-platform-list.component.scss'],
})
export class CloudServiceSoftwarePlatformListComponent implements OnInit {
  @Input() cloudService: EntityModelCloudServiceDto;

  constructor() {}

  ngOnInit(): void {}
}
