import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/products/product';
import { CartSerService } from '../../core/services/cart-ser.service';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CounterService } from '../../core/services/counter.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  specific_product!:product;
  isloding:boolean=false;
 constructor(private _ActivatedRoute:ActivatedRoute,private _CounterService:CounterService,private _ProductsService:ProductsService,private _ToastrService:ToastrService,private _CartSerService:CartSerService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      const id = params.get('id')!
      // console.log( id);
      this._ProductsService.get_specific_product(id).subscribe({
        next:(res)=>{
          this.specific_product=res.data;
          console.log(this.specific_product);
        }
      })
      
    })
  }
  add_cart(id:string){
    this.isloding=true;
this._CartSerService.add_to_cart(id).subscribe({
  next:(res)=>{
    console.log(res);
    this._CounterService.chenageData(res.numOfCartItems)
    // localStorage.setItem('couont',res.numOfCartItems)


    this.isloding=false;

    this._ToastrService.success('the product added in cart')

    
  },
  error:(err)=>{
    this.isloding=false;

    console.log(err);

  }
})
  }

}
