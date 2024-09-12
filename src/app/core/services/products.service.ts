import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environments/envionment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  get_all_products():Observable<any>
  {
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/products`);
  }
  get_specific_product(product_id:string):Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/products/${product_id}`)
  }
}
