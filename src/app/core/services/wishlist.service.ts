import { Token } from '@angular/compiler';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { envionment } from '../environments/envionment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
     token!:any;

  // https://ecommerce.routemisr.com/api/v1/wishlist
  _PLATFORM_ID = inject(PLATFORM_ID);

  constructor(private _HttpClient: HttpClient) {
     if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token={token:localStorage.getItem('userData')!}
    }
  }
  add_wishlist(_id: string): Observable<any> {
  
    return this._HttpClient.post(
      `${envionment.baseUrl}/api/v1/wishlist`,
      {
        productId: _id,
      },
      { headers: this.token }
    );
  }
  remove_item_from_wishlist(id: string): Observable<any> {
   
    return this._HttpClient.delete(
      `${envionment.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: 
          this.token
       
      }
    );
  }
  get_logged_user_wishlist(): Observable<any> {
  
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/wishlist`, {
      headers: 
         this.token 
      
    });
  }
}
