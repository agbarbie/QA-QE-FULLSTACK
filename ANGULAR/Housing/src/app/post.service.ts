import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts'; // JSON Server API

  constructor(private http: HttpClient) { }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
