import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Parameter } from '../model/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class ImplementationService {
  constructor(private httpClient: HttpClient) {
  }

  getImplementationsForId(algoId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId
      + environment.IMPLEMENTATION_ENDPOINT);
  }

  getImplementationById(algoId: number, implId: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId
      + environment.IMPLEMENTATION_ENDPOINT + implId);
  }

  createImplementation(algoId: number, jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId
      + environment.IMPLEMENTATION_ENDPOINT, JSON.parse(jsonString));
  }

  addParameter(parameter: Parameter, algoId: number, implId: number, type: string) {
    return type === 'input' ? this.addInputParameter(parameter, algoId, implId) : this.addOutputParameter(parameter, algoId, implId);
  }

  addInputParameter(parameter: Parameter, algoId: number, implId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId + environment.IMPLEMENTATION_ENDPOINT
      + implId + environment.INPUT_PARAMETERS, parameter);
  }

  addOutputParameter(parameter: Parameter, algoId: number, implId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId + environment.IMPLEMENTATION_ENDPOINT
      + implId + environment.OUTPUT_PARAMETERS, parameter);
  }
}
