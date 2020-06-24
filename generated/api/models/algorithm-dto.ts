/* tslint:disable */
import { ClassicAlgorithmDto } from './classic-algorithm-dto';
import { ProblemTypeDto } from './problem-type-dto';
import { QuantumAlgorithmDto } from './quantum-algorithm-dto';

/**
 * either a quantum or a classic algorithm
 */
export interface AlgorithmDto {
  acronym?: string;
  algoParameter?: string;
  applicationAreas?: Array<string>;
  assumptions?: string;
  computationModel: 'CLASSIC' | 'QUANTUM' | 'HYBRID';
  id?: string;
  inputFormat?: string;
  intent?: string;
  name: string;
  outputFormat?: string;
  problem?: string;
  problemTypes?: Array<ProblemTypeDto>;
  sketch?: 'PSEUDOCODE' | 'CIRCUIT' | 'ISING_MODEL';
  solution?: string;
}
