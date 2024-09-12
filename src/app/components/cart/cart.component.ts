import { Component, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartSerService } from '../../core/services/cart-ser.service';
import { log } from 'console';
import { cart_interface } from '../../core/interfaces/products/cart';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CounterService } from '../../core/services/counter.service';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  Cart!:cart_interface;
  success:boolean=false;
  cleared:boolean=false;
  success2:boolean=false;
  removed:boolean=false;
  exist_cart:boolean=true;
 
  
  // count:any;
  count:BehaviorSubject<any>=new BehaviorSubject(null)
  
  res_:any;
  constructor(private _CartSerService:CartSerService,private _CounterService: CounterService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
    
this._CartSerService.get_cart().subscribe({
  next:(res)=>{
    console.log(res);
    this.Cart=res;
    this.count.next(this.Cart.numOfCartItems);
    if (this.Cart.numOfCartItems==0) {
      this.exist_cart=false;
    }
   

  }
})
  }
  increment(id:string,coun:any){
    this.success=true;
    // this.success2=true;
    this._CartSerService.updata_quntity(id,coun).subscribe({
      next:(res)=>{
        this.success=false;
        console.log(res);
        this.Cart=res;
        this.res_=res;
      this._ToastrService.success('Success');
        
      }
    })
  }
  decrement(id:string,coun:any){
    this.success2=true;
    this._CartSerService.updata_quntity(id,coun).subscribe({
      next:(res)=>{
        console.log(res);
        this.success2=false;
        this.Cart=res;
      this._ToastrService.error('the item deleted');
      // console.log(rea);
      if(res.numOfCartItems==0)
      {
        this._CounterService.counter_send.next(0)
      }
      
        
      },
     
    })
  }
  remove(id:string){
    this.removed=true;
    this._CartSerService.delete_item(id).subscribe({
      next:(res)=>{
        console.log(res);
    this.removed=false;
    this._CounterService.chenageData(res.numOfCartItems)

    if (this.Cart.numOfCartItems==0) {
      this.exist_cart=false;
    }
   

        
        this.Cart=res
        this._ToastrService.error("the item deleted")
      },
      
    })
  }
  clear(){
    
    this.exist_cart=false;
    this.cleared=true;
    this._CartSerService.clear_cart().subscribe({
      next:(res)=>{
        this.Cart={} as cart_interface;
    this.cleared=false;

        console.log(res);
    this._CounterService.chenageData(0)

   

        
        this._ToastrService.error("the Cart become empty")
        
      },
      

    })
  }
}


