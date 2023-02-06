import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  api_url = "http://localhost:8000/api/user/";

  login(credentials){
    return this.http.post(this.api_url + 'login', credentials);
  }
  
}
