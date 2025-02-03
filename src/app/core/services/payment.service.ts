import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environments/envionment';
import { userInfo } from 'os';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  mytoken: any;
  _PLATFORM_ID = inject(PLATFORM_ID);
  constructor(private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.mytoken = { token: localStorage.getItem('userData') };
    }
  }
  // constructor(private _HttpClient: HttpClient) {}

  checkout(id: string, userData: any): Observable<any> {
    console.log(this.mytoken);
    return this._HttpClient.post(
      `${envionment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: userData,
      },{
        headers:
          this.mytoken
        
      }
    );
  }
}
