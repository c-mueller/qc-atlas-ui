import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { GenericsModule } from '../generics/generics.module';
import { CloudServiceViewComponent } from './cloud-services/cloud-service-view/cloud-service-view.component';
import { SoftwarePlatformViewComponent } from './software-platforms/software-platform-view/software-platform-view.component';
import { ExecutionEnvironmentsListComponent } from './execution-environments-list/execution-environments-list.component';
import { ComputeResourceViewComponent } from './compute-resource/compute-resource-view/compute-resource-view.component';
import { CloudServiceListComponent } from './cloud-services/cloud-service-list/cloud-service-list.component';
import { ComputeResourceListComponent } from './compute-resource/compute-resource-list/compute-resource-list.component';
import { SoftwarePlatformListComponent } from './software-platforms/software-platform-list/software-platform-list.component';
import { ExecutionEnvironmentSearchComponent } from './execution-environment-search/execution-environment-search.component';

@NgModule({
  declarations: [
    CloudServiceViewComponent,
    SoftwarePlatformViewComponent,
    ExecutionEnvironmentsListComponent,
    ComputeResourceViewComponent,
    CloudServiceListComponent,
    ComputeResourceListComponent,
    SoftwarePlatformListComponent,
    ExecutionEnvironmentSearchComponent,
  ],
  imports: [CommonModule, MatTabsModule, GenericsModule],
  exports: [
    SoftwarePlatformViewComponent,
    CloudServiceViewComponent,
    ComputeResourceViewComponent,
    ExecutionEnvironmentsListComponent,
    ExecutionEnvironmentSearchComponent,
  ],
})
export class ExecutionEnvironmentsModule {}
