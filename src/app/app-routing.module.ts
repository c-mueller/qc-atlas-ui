import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview/overview.component';
import { AlgorithmsComponent } from './components/overview/algorithms/algorithms.component';
import { ProvidersComponent } from './components/overview/providers/providers.component';
import { SdksComponent } from './components/overview/sdks/sdks.component';
import { TagsComponent } from './components/overview/tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'overview/algorithms', component: AlgorithmsComponent},
  {path: 'overview/providers', component: ProvidersComponent},
  {path: 'overview/sdks', component: SdksComponent},
  {path: 'overview/tags', component: TagsComponent},
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
