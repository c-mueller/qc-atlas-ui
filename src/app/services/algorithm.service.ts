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

  createAlgorithm(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + this.endPoint, JSON.parse(jsonString));
  }
}
