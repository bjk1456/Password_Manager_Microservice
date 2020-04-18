
import axios from 'axios';

import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
//import { FeedItem } from '../feed/models/feed-item.model';
import { catchError, tap, map } from 'rxjs/operators';

const API_HOST = environment.apiHost;


export class ApiService {

    //httpOptions: {};
    myHeaders = new Headers();

    //requestHeaders: HeadersInit = new Headers();
    headers = {'Content-Type': 'application/json', 'Authorization':''}


    //requestHeaders: HeadersInit = new Headers();

    //headers = {'Content-Type': 'application/json'}
    //authorization = {'Authorization':''};
    /**
    requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
*/
    /**
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
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
      console.log(`inside setAuthToken the token is ${token}`)
    //this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
      this.headers.Authorization = `Bearer ${token}`
      //this.httpOptions.headers = this.httpOptions.headers.append(''this.httpOptions.headers, `jwt ${token}`)
      //this.requestHeaders.set({'Content-Type': 'application/json'})

      /**
      for (let key in this.httpOptions.headers.keys()){
          console.log(`this.httpOptions.headers(key) == ${this.httpOptions.headers.get(key)}`)
      }
       */
      console.log(`this.httpOptions.headers.get('Content-Type') == ${this.headers["Content-Type"]}`)
      console.log(`this.httpOptions.headers.get('Authorization') == ${this.headers.Authorization}`)
      /**
      this.httpOptions = {
          headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization':`jwt ${token}`}
      }
       */

    this.token = token;
  }

  async get(endpoint): Promise<any> {
      const url = `http://localhost:8081/api/v0${endpoint}`
      //const url = `${API_HOST}${endpoint}`;
      //const req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));
      //console.log(`the headers are ${JSON.stringify(this.httpOptions)}`)
      console.log(`this.httpOptions.headers.get('Content-Type') == ${this.headers["Content-Type"]}`)
      console.log(`this.httpOptions.headers.get('Authorization') == ${this.headers.Authorization}`)
      const req = axios.get(url, {headers: this.headers})
          .then(res => {return res.data})
          .catch(err => {return err})
      console.log(`insisde ApiService GET the data is ${req}`)
      return req
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

      //const headers = {'Content-Type': 'application/json'}
      console.log(`this.httpOptions.headers.get('Content-Type') == ${this.headers["Content-Type"]}`)
      console.log(`this.httpOptions.headers.get('Authorization') == ${this.headers.Authorization}`)
      console.log(`the endpoint is ${url}`)
      console.log(`the data is ${data}`)

      const req = axios.post(url, data, {headers: this.headers})
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
