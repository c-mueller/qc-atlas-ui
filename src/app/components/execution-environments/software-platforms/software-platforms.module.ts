import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { SoftwarePlatformViewComponent } from './software-platform-view/software-platform-view.component';
import { SoftwarePlatformListComponent } from './software-platform-list/software-platform-list.component';
import { SoftwarePlatformPropertiesComponent } from './software-platform-properties/software-platform-properties.component';
import { SoftwarePlatformImplListComponent } from './software-platform-impl-list/software-platform-impl-list.component';
import { SoftwarePlatformCloudServiceListComponent } from './software-platform-cloud-service-list/software-platform-cloud-service-list.component';
import { SoftwarePlatformComputeResourceListComponent } from './software-platform-compute-resource-list/software-platform-compute-resource-list.component';

@NgModule({
  declarations: [
    SoftwarePlatformViewComponent,
    SoftwarePlatformListComponent,
    SoftwarePlatformPropertiesComponent,
    SoftwarePlatformImplListComponent,
    SoftwarePlatformCloudServiceListComponent,
    SoftwarePlatformComputeResourceListComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    NavigationBreadcrumbModule,
  ],
  exports: [SoftwarePlatformViewComponent, SoftwarePlatformListComponent],
})
export class SoftwarePlatformsModule {}
