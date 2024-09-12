import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envionment } from '../environments/envionment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class catagoryService {

  constructor( private _HttpClient:HttpClient) { }
  get_all_catagory():Observable<any>{
   return this._HttpClient.get(`${envionment.baseUrl}/api/v1/categories`)
  }
  get_specfic_cat(id:string):Observable<any>{
   return this._HttpClient.get(`${envionment.baseUrl}/api/v1/categories/${id}`)
  }
  get_sup_on_cat(cat_id:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${cat_id}/subcategories`)
  }
}
