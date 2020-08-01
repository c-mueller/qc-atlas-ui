import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

// placeholder content
const PLACEHOLDER_TAGS: Tag[] = [
  {
    category: 'Machine Learning',
    value: 'Naive Bayes',
  },
  {
    category: 'Machine Learning',
    value: 'Classification',
  },
  {
    category: 'Topic',
    value: 'Data Science',
  },
  {
    category: 'Learning',
    value: 'Eager Learning',
  },
];

@Component({
  selector: 'app-tags-component',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnChanges {
  @Input() allowRemoving = true;
  @Input() tags: Tag[] = PLACEHOLDER_TAGS;

  @Output() onRemove: EventEmitter<Tag> = new EventEmitter<Tag>();

  showCategories = true;
  categoryToColor: Record<string, string>;
  assignedRandoms: number[] = [];
  // unfortunately there is no quick way to extract angular mat-colors form sass
  colorPalette: string[] = [
    '#e57373', // corresponds to mat colors mat-* 300
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65',
    '#a1887f',
    '#e0e0e0',
    '#90a4ae',
  ];

  constructor() {
    // retrieve generated colors from local storage or set them if empty
    const localStorageKey = 'atlas-tag-categories';
    if (localStorage.getItem(localStorageKey)) {
      this.categoryToColor = JSON.parse(localStorage.getItem(localStorageKey));
    } else {
      if (!this.categoryToColor) {
        this.initColors();
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(this.categoryToColor)
        );
        console.log(JSON.stringify(this.categoryToColor));
      }
    }
  }

  ngOnChanges(): void {
    // check if every category has color
  }

  initColors(): void {
    this.categoryToColor = {};
    for (const tag of this.tags) {
      if (!(tag.category in this.categoryToColor)) {
        const i = this.getUniqueRandom();
        this.categoryToColor[tag.category] = this.colorPalette[i];
      }
    }
  }

  getUniqueRandom(): number {
    const rand = Math.floor(Math.random() * (this.colorPalette.length - 1)) + 1;
    if (this.assignedRandoms.find((num) => num === rand)) {
      return this.getUniqueRandom();
    }
    this.assignedRandoms.push(rand);
    return rand;
  }

  removeTag(tag: Tag): void {
    this.tags = this.tags.filter((t) => t.value !== tag.value);
    this.onRemove.emit(tag);
  }

  addTag(): void {
    // TODO
  }

  /**
   * workaround see: https://github.com/angular/angular/issues/17725
   */
  getCategories(): string[] {
    return Object.keys(this.categoryToColor);
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }
}

export interface Tag {
  value: string;
  category: string;

  // not used in backend - will be filled automatically
  color?: string;
}
