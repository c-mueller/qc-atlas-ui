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

  constructor(private router: Router, private algorithmService: AlgorithmService) {
  }

  ngOnInit(): void {
    this.algorithmService.getAllAlgorithms(this.page, this.size).subscribe(
      data => {
        this.algorithms = data.algorithmDtos;
      }
    );
  }

  tabIndexChanged(index: any): void {
    this.activeIndex = index;
    this.router.navigate(['overview/' + this.tabs[this.activeIndex]]);
  }
}
