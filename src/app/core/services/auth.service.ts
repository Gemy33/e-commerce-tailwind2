import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { envionment } from '../environments/envionment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uer_info_form_token:BehaviorSubject<any>=new BehaviorSubject(null);
 constructor(private _HttpClient:HttpClient,private _Router:Router) {
}
send_register(group:any):Observable<any>{
 return this._HttpClient.post(`${envionment.baseUrl}/api/v1/auth/signup`,group)
}
send_login(group:any):Observable<any>{
 return this._HttpClient.post(`${envionment.baseUrl}/api/v1/auth/signin`,group)
}
decode():void{
  if(localStorage.getItem('userData')!==null)
  {
   this.uer_info_form_token.next(jwtDecode(localStorage.getItem('userData') !))
  }
}
signOut():void{

  // if(localStorage.getItem("userData"))
  // {

  // }
  localStorage.removeItem('userData');
  this.uer_info_form_token.next(null);
  this._Router.navigate(['/login']);
  
}
 verfiy_email(data:object):Observable<any>
 {
   return this._HttpClient.post(`${envionment.baseUrl}/api/v1/auth/forgotPasswords`,data);
 }
 verfiy_code(data:object):Observable<any>
 {
   return this._HttpClient.post(`${envionment.baseUrl}/api/v1/auth/verifyResetCode`,data);
 }
 reset_password(data:object):Observable<any>
 {
   return this._HttpClient.put(`${envionment.baseUrl}/api/v1/auth/resetPassword`,data);
 }
}
