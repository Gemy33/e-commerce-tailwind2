import { error } from 'node:console';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  is_loged:boolean=false;
  is_loading:boolean=false;
  is_error:boolean=false;
  is_success:boolean=false;
  msg_err:string='';
  user_token:string='';
   _PLATFORM_ID=inject(PLATFORM_ID)

  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router
  ){
    
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      if(localStorage.getItem('userData'))
        this._Router.navigate(['\home'])
    }
  }

 login_form:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/.{6,}/)]],
  })
  submit_login(){
    this.is_loged=true;
    console.log(this.login_form);
    this.is_loading=true;
    this._AuthService.send_login(this.login_form.value).subscribe({
      
      next:(res)=>{
        this.is_loged=false;
        console.log(res.token)
        this.is_success=true;
        this.is_error=false;
        this.is_loading=false;
        localStorage.setItem('userData',res.token);
      this._AuthService.decode();
        setTimeout(() => {
          this._Router.navigate(['\home'])
        }, 1000);

      },
      error:(err)=>{
        console.log(err);
        this.is_loged=false;

        this.is_loading=false;
        this.is_error=true;
        this.msg_err=err.error.message;
        
      }
    });
    
  }
}
