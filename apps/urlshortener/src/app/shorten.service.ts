import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Message } from '@evolving/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShortenService {
  constructor(private httpClient: HttpClient) {}

  getShortURL(fullurl: string): Observable<Message> {
    return this.httpClient.post<Message>(`/api/short`, { url: fullurl });
  }

  getFullURL(shorturl: string): Observable<Message> {
    return this.httpClient.get<Message>(`/api/long/${encodeURI(shorturl)}`);
  }

  isAvailable(shorturl: string): Observable<boolean> {
    // TODO: implement
    return this.httpClient
      .get<Message>(`/api/available/${shorturl}`)
      .pipe(map((e) => e.success));
  }
}
