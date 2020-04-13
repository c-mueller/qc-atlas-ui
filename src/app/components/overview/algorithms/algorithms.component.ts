import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgorithmService } from '../../../services/algorithm.service';
import { Algorithm } from '../../../model/algorithm.model';

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

  displayedParametersColumns: string[] = ['name', 'type', 'description', 'restriction'];
  displayedTagsColumns: string[] = ['key', 'value'];

  constructor(private router: Router, private algorithmService: AlgorithmService) {
  }

  ngOnInit(): void {
    this.algorithmService.getAllAlgorithms(this.page, this.size).subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
        if (this.algorithms.length > 0) {
          this.selectedAlgorithm = this.algorithms[0];
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
    console.log(this.selectedAlgorithm);
  }

  getColor(id: number): string {
    if (id === this.selectedAlgorithm.id) {
      return this.selectedColor;
    }
    return null;
  }
}
