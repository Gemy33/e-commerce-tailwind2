import { error } from 'node:console';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  is_loading:boolean=false;
  is_error:boolean=false;
  is_submit:boolean=false;
  is_error_res_pass:boolean=false;
  is_error_res_em:boolean=false;
  is_error_code:boolean=false;
  msg_err_reset:string='';
  msg_err_code:string='';
  msg_err_email:string='';
  rest_msg:string='';
  step:number=1;
  
  constructor(private _AuthService:AuthService,private _Router:Router){
    // localStorage.setItem('step',this.step.toString())

  }
  verfiy_email:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
  })
  verfiy_code:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/.{6}/)]),
  })
  updata_password:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/.{6,}/)]),
  })

  verfiy_email_():void{


    let prv_email=this.verfiy_email.get('email')?.value;
    this.updata_password.get('email')?.setValue(prv_email)
    this.is_submit=true;
    this.is_loading=true;
    console.log(this.verfiy_email);
    this._AuthService.verfiy_email(this.verfiy_email.value).subscribe({
      next:(res)=>{
    this.is_submit=false;

        console.log(res);
        this.step=2;
        localStorage.setItem('curentstep',this.step.toString())
        localStorage.setItem('email',prv_email)
        this.is_loading=false;
        this.is_error=false;
       this.rest_msg=res.message;

      },
      error:(err)=>{
    this.is_submit=false;

        console.log(err);
        // this.is_error_email=true;
        this.msg_err_email=err.error.message;
        this.is_loading=false;
        this.is_error=true;
      }
    })
    
  }
  verfiy_code_():void{
    console.log(this.verfiy_code);
    this.is_submit=true;

    this.is_loading=true;
    this._AuthService.verfiy_code(this.verfiy_code.value).subscribe({
      next:(res)=>{console.log(res);
    // this.is_error=true;

        this.step=3;
        localStorage.setItem('curentstep',this.step.toString())


        this.is_loading=false;
        this.is_error=false;
    this.is_submit=false;

      },
      error:(err)=>{console.log(err);
        this.msg_err_code=err.error.message;
        this.is_error_code=true;
    this.is_submit=false;

        this.is_loading=false;
        this.is_error=true;
      }
    })
    
  }
  updata_password_():void{
    console.log(this.updata_password);
    // this.is_error=true;
    this.is_submit=true;
    this.is_loading=true;

    this._AuthService.reset_password(this.updata_password.value).subscribe({
      
      next:(res)=>{
        console.log(res);
    this.is_submit=false;

        localStorage.setItem("userData",res.token);
        this._AuthService.decode();
        localStorage.setItem('curentstep',this.step.toString())

        this.is_error=false;
        this.is_loading=false;
        this._Router.navigate(['/home']);
        
      },
      error:(err)=>{console.log(err);
        this.msg_err_reset=err.error.message;
    this.is_submit=false;

        this.is_loading=false;
        this.is_error=true;
      }
    })

  }
  ngOnInit(){
    if(typeof localStorage !=='undefined')
    {



      this.step=Number(localStorage.getItem('curentstep')) || 1;
    this.updata_password.get('email')?.setValue(localStorage.getItem('email'))

      
    }
  }
}
