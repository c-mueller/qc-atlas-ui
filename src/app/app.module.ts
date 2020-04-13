import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview/overview.component';
import { AlgorithmsComponent } from './components/overview/algorithms/algorithms.component';
import { ProvidersComponent } from './components/overview/providers/providers.component';
import { SdksComponent } from './components/overview/sdks/sdks.component';
import { TagsComponent } from './components/overview/tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NisqAnalyzerComponent } from './components/nisq-analyzer/nisq-analyzer/nisq-analyzer.component';
import { ProvenanceComponent } from './components/provenance/provenance/provenance.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AlgorithmsComponent,
    ProvidersComponent,
    SdksComponent,
    TagsComponent,
    PageNotFoundComponent,
    NisqAnalyzerComponent,
    ProvenanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
