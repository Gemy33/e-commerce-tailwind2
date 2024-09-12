import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error, log } from 'node:console';
import { AuthService } from '../../core/services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  is_shown1:boolean=false;
  is_shown:boolean=false;
  msg_err:string='';
  is_error=false;
  is_loading:boolean=false;
  is_success:boolean=false;

  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router){}
register_form:FormGroup=this._FormBuilder.group({
  name:[null,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/.{6,}/)]],
  rePassword:[null,[Validators.required]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]],
},{validators:this.confirmPassword})
  
confirmPassword(reg:AbstractControl){
  return (reg.get('password')?.value===reg.get('rePassword')?.value)? null : {'mismatch':true};
}


submit_register(){
  this.is_loading=true;
  console.log(this.register_form);
this._AuthService.send_register(this.register_form.value).subscribe({
  next:(res)=>{console.log(res);
    this.is_loading=false;
    this.is_success=true;
    this.is_error=false;
   setTimeout(() => {
    this._Router.navigate(['/login'])
   }, 1000);

  },
  error:(err)=>{console.log(err);
    this.is_error=true;
    this.msg_err=err.error.message;
    this.is_loading=false;
  }
})
  
}
}
