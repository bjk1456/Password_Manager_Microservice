
import axios from 'axios';
//import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';

import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
//import { FeedItem } from '../feed/models/feed-item.model';
import { catchError, tap, map } from 'rxjs/operators';

const API_HOST = environment.apiHost;


export class ApiService {

    httpOptions: {}
    /**
  httpOptions = {
    headers: {'Content-Type': 'application/json'}
  };
     */

  token: string;

  /**
  constructor(private ax: axios) {
  }
*/
  handleError(error: Error) {
    alert(error.message);
  }

  setAuthToken(token) {
    //this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
      this.httpOptions = {
          headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization':`jwt ${token}`}
      }
    this.token = token;
  }

  async get(endpoint): Promise<any> {
      const url = `${API_HOST}${endpoint}`;
      //const req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));
      const req = await axios.get(url, this.httpOptions)
      console.log(`insisde ApiService GET the data is ${req.data}`)
      /**
       return req
       .toPromise()
       .catch((e) => {
              this.handleError(e);
              throw e;
          });
       */
  }

  async post(endpoint, data): Promise<any> {
      const url = `${API_HOST}${endpoint}`;
      //this.httpOptions = {headers: {'Access-Control-Allow-Origin': '*'}}
      this.httpOptions = {
          headers: {'Content-Type': 'application/json'}
      }
      const headers = {'Content-Type': 'application/json'}
      console.log(`the options are ${this.httpOptions.toString()}`)
      console.log(`the endpoint is ${url}`)
      console.log(`the data is ${data}`)

      const req = axios.post(url, data, {headers: headers})
          .then(res => {return res.data})
          .catch(err => {return err})

      return req

      /**
       return axios.get(url, this.httpOptions)
       .toPromise()
       .catch((e) => {
              this.handleError(e);
              throw e;
          });
       */
      //console.log(`insisde ApiService POST the data is ${req.data}`)
      /**
       return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
       .toPromise()
       .catch((e) => {
              this.handleError(e);
              throw e;
            });
       */
  }
/**
  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type});
    const req = new HttpRequest( 'PUT', signed_url, file,
                                  {
                                    headers: headers,
                                    reportProgress: true, // track progress
                                  });

    return new Promise ( resolve => {
        this.http.request(req).subscribe((resp) => {
        if (resp && (<any> resp).status && (<any> resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }
*/
  /// Utilities
/**
  private extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }
 */
}
