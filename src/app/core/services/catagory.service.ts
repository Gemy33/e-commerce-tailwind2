import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envionment } from '../environments/envionment';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor( private _HttpClient:HttpClient) { }
  get_all_catagory():Observable<any>{
    return this._HttpClient.get(`${envionment.baseUrl}/api/v1/categories`)
  }
  get_specfic_cat(id:string){
    this._HttpClient.get(`${envionment.baseUrl}/api/v1/categories/${id}`)
  }
}
