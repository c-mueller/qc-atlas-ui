import { Parameter } from './parameter.model';
import { Content } from './content.model';
import { Tag } from './tag.model';
import { Link } from './link.model';

export class Algorithm {
  id: number;
  name: string;
  inputParameters: Parameter[];
  content: Content;
  outputParameters: Parameter[];
  tags: Tag[];
  links: Link[];
}
