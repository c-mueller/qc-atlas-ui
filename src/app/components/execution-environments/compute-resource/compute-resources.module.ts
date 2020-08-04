import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { ComputeResourceSoftwarePlatformListComponent } from './compute-resource-software-platform-list/compute-resource-software-platform-list.component';
import { ComputeResourceCloudServiceListComponent } from './compute-resource-cloud-service-list/compute-resource-cloud-service-list.component';
import { ComputeResourcePropertiesComponent } from './compute-resource-properties/compute-resource-properties.component';
import { ComputeResourceViewComponent } from './compute-resource-view/compute-resource-view.component';
import { ComputeResourceListComponent } from './compute-resource-list/compute-resource-list.component';

@NgModule({
  declarations: [
    ComputeResourceViewComponent,
    ComputeResourceListComponent,
    ComputeResourceSoftwarePlatformListComponent,
    ComputeResourceCloudServiceListComponent,
    ComputeResourcePropertiesComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    NavigationBreadcrumbModule,
  ],
  exports: [ComputeResourceViewComponent, ComputeResourceListComponent],
})
export class ComputeResourcesModule {}
