import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envionment } from '../environments/envionment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor( private _HttpClient:HttpClient) { }
  get_all_brands():Observable<any>{
   return this._HttpClient.get(`${envionment.baseUrl}/api/v1/brands`)
  }
  get_specfic_brand(id:string):Observable<any>{
   return this._HttpClient.get(`${envionment.baseUrl}/api/v1/brands/${id}`)
  }
}
