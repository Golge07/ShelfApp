import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) { }
  api_url = "http://localhost:8000/api/shelf/";

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
  });


  get_shelves(): Observable<any> {
    return this.http.post<any>(this.api_url + 'all', {}, { headers: this.header });
  }

  add_shelf(shelf): Observable<any> {
    return this.http.post<any>(this.api_url + 'add', shelf, { headers: this.header });
  }

  update_shelf(shelf): Observable<any> {
    return this.http.post<any>(this.api_url + 'update', shelf, { headers: this.header });
  }

  delete_shelf(shelf): Observable<any> {
    return this.http.post<any>(this.api_url + 'delete', { 'number': shelf }, { headers: this.header });
  }

  search_shelf(search): Observable<any> {
    return this.http.post<any>(this.api_url + 'search', search, { headers: this.header });
  }

  get_info(): Observable<any> {
      return this.http.post<any>(this.api_url + 'info', {}, { headers: this.header });
  }
}
