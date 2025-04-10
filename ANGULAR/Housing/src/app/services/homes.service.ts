import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {homes, manager} from "../interfaces/home"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private BaseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getHomes(): Observable<homes[]> {
    return this.http.get<homes[]>(`${this.BaseUrl}/id`);
  }

  getManagerById(manager_Id: number): Observable<manager[]> {
    return this.http.get<manager[]>(`${this.BaseUrl}/posts?manager_Id=${manager_Id}`);
  }
}