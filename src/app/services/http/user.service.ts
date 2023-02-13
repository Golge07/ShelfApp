import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) { }
  api_url = "http://localhost:8000/api/";
  Header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
  });
  login(credentials): Observable<string> {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    return this.http.post<string>(this.api_url + 'login', credentials, { headers: myHeaders });
  }

  get_user(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user', {}, { headers: this.Header });
  }
  get_all_users(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/all', {}, { headers: this.Header });
  }
  register(credentials): Observable<string> {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    return this.http.post<string>(this.api_url + 'register', credentials, { headers: myHeaders });
  }

  info(): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/info', {}, { headers: this.Header });
  }

  search_user(search): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/search', search, { headers: this.Header });
  }

  update(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/update', user, { headers: this.Header });
  }

  delete(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/delete', user, { headers: this.Header });
  }

  add(user): Observable<any> {
    return this.http.post<any>(this.api_url + 'user/add', user, { headers: this.Header });
  }

  logout() {
    this.http.post<any>(this.api_url + 'logout', {}, { headers: this.Header }).subscribe(
      data => {
        console.log(data);
        localStorage.removeItem('user_token');
        this.router.navigate(['/login']);
      }
    );
  }
  
}
