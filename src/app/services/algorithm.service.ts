import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  endPoint = '/algorithms/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAlgorithms(page: number, size: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + this.endPoint + '?page=' + page + '&size=' + size);
  }

  createAlgorithm(): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.endPoint, {
      name: 'Quantum Phase Estimation Algorithm',
      inputParameters: {
        parameters: [{
          name: 'U',
          type: 'FloatArray',
          description: 'Unitary matrix U for which to find the corresponding eigenvalue',
          restriction: 'U unitary'
        }, {
          name: 'Eigenvector',
          type: 'IntegerArray',
          description: 'Eigenvector of unitary matrix U',
          restriction: 'eigenvector of U'
        }]
      },
      outputParameters: {parameters: [{name: 'Eigenvalue', type: 'Float'}]},
      content: {
        description: 'The quantum phase estimation algorithm estimates the eigenvalues, or phase, of an eigenvector of a unitary matrix. It is frequently used as a subroutine in other quantum algorithms, such as the algorithm of Shor.'
      }
    });
  }

  createAntoherAlgorithm(): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.endPoint, {
      name: 'Shor',
      inputParameters: {
        parameters: [{
          name: 'N',
          type: 'Integer',
          description: 'Number to be factorized',
          restriction: 'N > 0,N odd'
        }]
      },
      outputParameters: {parameters: [{name: 'Factor', type: 'Integer'}]},
      content: {
        expectedSpeedup: 'exponential',
        numberOfQubits: '$2n$',
        numberOfGates: '$4n^3$',
        algoAuthor: 'Shor',
        description: 'The algorithm of Shor is a ploynomial-time quantum computer algorithm for factorizing integers. It solves the following problem: GIven an integer N, find its prime factors. The American mathematician Peter Shor invented the algorithm in 1994.'
      },
      tags: [
        {
          id: '47',
          key: 'Algorithm class',
          value: 'Factorization'
        }
      ]
    });
  }
}
