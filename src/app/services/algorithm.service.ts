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
}
