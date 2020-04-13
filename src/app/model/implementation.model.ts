import { Tag } from './tag.model';
import { Link } from './link.model';
import { Parameters } from './parameters.model';

export class Implementation {
  content: string;
  fileLocation: string;
  id: number;
  inputParameters: Parameters;
  name: string;
  outputParameters: Parameters;
  programmingLanguage: string;
  sdk: string;
  selectionRule: string;
  tags: Tag[];
  links: Link[];
}
