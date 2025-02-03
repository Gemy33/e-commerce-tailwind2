import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { envionment } from '../environments/envionment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

     token!:any;

  // https://ecommerce.routemisr.com/api/v1/wishlist

  _PLATFORM_ID = inject(PLATFORM_ID);
  wishlistCounter=signal(0);
  changeWishlistCounter(newCounter:number)
  {
    this.wishlistCounter.set(newCounter);
  }

  constructor(private _HttpClient: HttpClient) {
//  console.log("dfdfsf");
   if (typeof localStorage !== 'undefined') {
    this.get_logged_user_wishlist().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.changeWishlistCounter(res.count)
        
      },error:(err)=>{
        // console.log(err);
        
      }
    })
    
   }
   
  }

  add_wishlist(_id: string): Observable<any> {
    return this._HttpClient.post(
      `${envionment.baseUrl}/api/v1/wishlist`,
      {
        productId: _id,
      },
      {
        headers: {
          token: localStorage.getItem('userData')!,
        },
      }
    );
  }
  remove_item_from_wishlist(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${envionment.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem('userData')!,
        },
      }
    );
  }
  get_logged_user_wishlist() {
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem('userData')!,
      },
    });
  }
}
