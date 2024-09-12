import { PaymentService } from './../../core/services/payment.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  id!:string
  isloading:boolean=false;
  constructor(private _FormBuilder:FormBuilder,private _PaymentService: PaymentService ,private _ActivatedRoute:ActivatedRoute){
  }
   userDetails:FormGroup=this._FormBuilder.group({
    "details":[null,[Validators.required]],
    "phone":[null,[Validators.required]],
    "city":[null,[Validators.required]]
  })
  ngOnInit(){
    this._ActivatedRoute.paramMap.subscribe((parem)=>{
      this.id=parem.get("Id")!;
    })
  }

  pay(){
    console.log(this.userDetails.value);
  this.isloading=true;

    console.log(this.id);
    this._PaymentService.checkout(this.id,this.userDetails.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isloading=false;
        open(res.session.url)
        
      }
   
    })
     
  }

}
