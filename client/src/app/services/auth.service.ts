import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl       = environment.backend + '/api/auth';
  private loginPath     = 'login';
  private registerPath  = 'register';
  private logoutPath    = 'logout';
  private getUserPath   = 'user';

  constructor(private http : HttpClient) { }

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo');
    
    if (userData && JSON.parse(userData)){
      return true;
    }
    else{
      return false;
    }
    
  }

  public authenticatedUser(): Object {
    let userData = localStorage.getItem('userInfo');

    return JSON.parse(userData!);
  }

  public setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  clearStorage() {
    localStorage.clear();
  }

  public login(username: string, password: string) {
    return this.http.post(`${ this.authUrl }/${ this.loginPath }`, { 'username': username, 'password': password }, httpOptions);
  }

  public registerUser(user: User) {
    return this.http.post(`${ this.authUrl }/${ this.registerPath }`, user, httpOptions);
  }

  public logoutUser() {
    return this.http.get(`${ this.authUrl }/${ this.logoutPath }`, httpOptions);
  }
}
