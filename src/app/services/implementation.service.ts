import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

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

  createImplementation(algoId: number, jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.ALGORITHM_ENDPOINT + algoId
      + environment.IMPLEMENTATION_ENDPOINT, JSON.parse(jsonString));
  }
}
