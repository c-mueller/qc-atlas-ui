import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tag, TagsDtos } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(environment.API_URL + environment.TAG_ENDPOINT, tag);
  }

  createTagWithJson(jsonString: string): Observable<Tag> {
    return this.httpClient.post<Tag>(environment.API_URL + environment.TAG_ENDPOINT, JSON.parse(jsonString));
  }

  getAllTags(): Observable<TagsDtos> {
    return this.httpClient.get<TagsDtos>(environment.API_URL + environment.TAG_ENDPOINT);
  }
}
