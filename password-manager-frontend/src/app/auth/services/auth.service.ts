//import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { User } from '../models/user.model';
import { ApiService } from '../../api/api.service';
import { catchError, tap } from 'rxjs/operators';

const JWT_LOCALSTORE_KEY = 'jwt';
const USER_LOCALSTORE_KEY = 'user';
/**
@Injectable({
  providedIn: 'root'
})
 */
export class AuthService {
  //currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor( private api: ApiService ) {
    this.initToken();
  }

  initToken() {
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    //const user = <User> JSON.parse(localStorage.getItem(USER_LOCALSTORE_KEY));
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string) {
    localStorage.setItem(JWT_LOCALSTORE_KEY, token);
    //localStorage.setItem(USER_LOCALSTORE_KEY, JSON.stringify(user));
    this.api.setAuthToken(token);
    //this.currentUser$.next(user);
  }

   login(email: string, password: string): Promise<any> {
      console.log("Hello! from the login function")
         //this.api.post('/users/auth/login',
          //   {email: email, password: password})
    return this.api.post('/users/auth/login',
              {email: email, password: password})
              .then((res) => {
                  console.log(`the res is ${res.token}`)
                this.setToken(res.token);

                return res;
              })
              .catch((e) => { throw e; });
      // return user !== undefined;
  }

  logout(): boolean {
    //this.setToken(null);
    localStorage.clear();
    return true;
  }
/**
  register(email: string, password: string): Promise<any> {
    return this.api.post('/users/auth/',
              {email: email, password: password})
              .then((res) => {
                this.setToken(res.token);
                return res;
              })
              .catch((e) => { throw e; });
  }
 */
}
