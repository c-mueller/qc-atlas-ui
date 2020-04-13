import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Parameter } from '../model/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAlgorithms(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.ALGORITHM_ENDPOINT);
  }

  createAlgorithm(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT, JSON.parse(jsonString));
  }

  addInputParameter(parameter: Parameter, algorithmId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algorithmId
      + environment.INPUT_PARAMETERS, parameter);
  }

  addOutputParameter(parameter: Parameter, algorithmId: number): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algorithmId
      + environment.OUTPUT_PARAMETERS, parameter);
  }

  getAlgorithmById(id: number): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.ALGORITHM_ENDPOINT + id);
  }
}
