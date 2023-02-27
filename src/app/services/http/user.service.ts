import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private router: Router) { }
  api_url = "http://localhost:8000/api/";

  login(credentials): Observable<string> {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    return this.http.post<string>(this.api_url + 'login', credentials, { headers: myHeaders });
  }

  get_user(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user', {}, { headers: this.create_header() });
  }
  get_all_users(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/all', {}, { headers: this.create_header() });
  }
  register(credentials): Observable<string> {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    return this.http.post<string>(this.api_url + 'register', credentials, { headers: myHeaders });
  }

  info(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/info', {}, { headers: this.create_header() });
  }

  search_user(search): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/search', search, { headers: this.create_header() });
  }

  update(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/update', user, { headers: this.create_header() });
  }

  delete(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/delete', user, { headers: this.create_header() });
  }

  add(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/add', user, { headers: this.create_header() });
  }

  logout() {
    this.http.post<any>(this.api_url + 'user/logout', {}, { headers: this.create_header() }).subscribe(
      data => {
        console.log(data);
        localStorage.removeItem('user_token');
        this.router.navigate(['/login']);
      }
    );
  }

  verify_email(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/verify/send', {}, { headers: this.create_header() });
  }

  create_header() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    });
  }
}
