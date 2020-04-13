import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImplementationService {

  implementationEndpoint = '/implementations/';

  constructor(private httpClient: HttpClient) {
  }

  getImplementationsForId(algoId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + '/algorithms/' + algoId + this.implementationEndpoint);
  }

  createImplementation(algoId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + '/algorithms/' + algoId +  this.implementationEndpoint, {
      name: 'qiskit-aqua-shor',
      programmingLanguage: 'Python',
      fileLocation: 'https://github.com/Qiskit/qiskit-aqua/blob/master/qiskit/aqua/algorithms/factorizers/shor.py',
      selectionRule: 'executable(N, shor-15-qiskit) :- N > 2.',
      sdk: 'Qiskit',
      inputParameters: {
        parameters: [
          {
            name: 'N',
            type: 'Integer',
            restriction: 'N>2',
            description: 'Integer to be factored'
          }
        ]
      },
      outputParameters: {
        parameters: [
          {
            name: 'factors',
            type: 'IntegerArray',
            restriction: '',
            description: 'Factors of N'
          }
        ]
      },
      content: {
        numberOfQubits: '$2n+3$'
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
