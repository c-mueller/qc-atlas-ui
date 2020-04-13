import { Tag } from './tag.model';
import { Parameter } from './parameter.model';
import { Link } from './link.model';

export class Implementation {
  content: string;
  fileLocation: string;
  id: number;
  inputParameters: Parameter;
  name: string;
  outputParameters: Parameter;
  programmingLanguage: string;
  sdk: string;
  selectionRule: string;
  tags: Tag[];
  links: Link[];
}
