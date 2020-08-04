import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../../generics/generics.module';
import { CloudServiceViewComponent } from './cloud-service-view/cloud-service-view.component';
import { CloudServiceListComponent } from './cloud-service-list/cloud-service-list.component';
import { CloudServiceComputeResourceListComponent } from './cloud-service-compute-resource-list/cloud-service-compute-resource-list.component';
import { CloudServicePropertiesComponent } from './cloud-service-properties/cloud-service-properties.component';
import { CloudServiceSoftwarePlatformListComponent } from './cloud-service-software-platform-list/cloud-service-software-platform-list.component';

@NgModule({
  declarations: [
    CloudServiceViewComponent,
    CloudServiceListComponent,
    CloudServiceComputeResourceListComponent,
    CloudServicePropertiesComponent,
    CloudServiceSoftwarePlatformListComponent,
  ],
  imports: [CommonModule, MatTabsModule, GenericsModule, MatCardModule],
  exports: [CloudServiceViewComponent, CloudServiceListComponent],
})
export class CloudServicesModule {}
