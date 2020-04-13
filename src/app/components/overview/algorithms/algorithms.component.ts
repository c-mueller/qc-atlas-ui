import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../../../services/algorithm.service';
import { Algorithm } from '../../../model/algorithm.model';
import { ImplementationService } from '../../../services/implementation.service';
import { Implementation } from '../../../model/implementation.model';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  activeIndex = 0;
  tabs = ['algorithms', 'providers', 'sdks', 'tags'];
  page = 0;
  size = 50;
  algorithms: Array<Algorithm> = [];
  selectedColor = 'primary';
  overviewPage = 'overview/';

  selectedAlgorithm: Algorithm;
  implementations: Array<Implementation> = [];

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];
  displayedTagsColumns: string[] = ['key', 'value'];
  displayedImplementationColumns: string[] = ['name', 'sdk'];

  constructor(private router: Router, private algorithmService: AlgorithmService, private implementationService: ImplementationService) {
  }

  ngOnInit(): void {
    this.algorithmService.getAllAlgorithms(this.page, this.size).subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
        // set initial selected algorithm
        if (this.algorithms.length > 0) {
          this.algorithmSelected(this.algorithms[0]);
        }
      }
    );
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate([this.overviewPage + this.tabs[this.activeIndex]]);
  }

  algorithmSelected(algorithm: Algorithm): void {
    this.selectedAlgorithm = algorithm;
    this.getImplementations(this.selectedAlgorithm.id);
  }

  getImplementations(id: number) {
    this.implementationService.getImplementationsForId(this.selectedAlgorithm.id).subscribe(
      data => {
        this.implementations = data.implementationDtos;
        console.log(this.implementations);
      }
    );
  }

  getColor(id: number): string {
    if (id === this.selectedAlgorithm.id) {
      return this.selectedColor;
    }
    return null;
  }
}
