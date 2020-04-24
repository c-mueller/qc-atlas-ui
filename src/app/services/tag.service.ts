import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {
  }

  createTag(tag: Tag): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.TAG_ENDPOINT, tag);
  }

  createTagWithJson(jsonString: string): Observable<any> {
    return this.httpClient.post(environment.API_URL + environment.TAG_ENDPOINT, JSON.parse(jsonString));
  }

  getAllTags(): Observable<any> {
    return this.httpClient.get(environment.API_URL + environment.TAG_ENDPOINT);
  }
}
