import { join } from 'node:path';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { product } from '../../core/interfaces/products/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartSerService } from '../../core/services/cart-ser.service';
import { ToastrService } from 'ngx-toastr';
import { CounterService } from '../../core/services/counter.service';
import { catagoryService } from '../../core/services/catagories.service';
import { single } from 'rxjs';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,RouterLink, SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  // display_text:WritableSignal<string>=single();

  display_text:string=''
  _ActivatedRoute=inject(ActivatedRoute)
  _catagoryService=inject(catagoryService)
  _BrandsService=inject(BrandsService)
term!:string
products:product[]=[];
ngOnInit(): void {
 this._ProductsService.get_all_products().subscribe((res)=>{
  // console.log(res.data);
  this.products=res.data;
  // console.log(this.products[0]);
  this._ActivatedRoute.paramMap.subscribe((res)=>{
    if (res.get('id')) {
      this._catagoryService.get_specfic_cat(res.get('id')!).subscribe((res)=>{
        console.log(res.data.name.split("",3).join(""));
        this.display_text=res.data.name.split("",3).join("");
        // console.log(this.display_text.name);
        
      this.products=  this.products.filter(p=>p.category.name.split("",3).join("")===this.display_text)
        console.log(this.products);
        
        
      })
      
    }
   
    
  })
  
  
 })
}
_ProductsService=inject(ProductsService)
_ToastrService=inject(ToastrService)
_WishlistService=inject(WishlistService)
_CartSerService=inject(CartSerService)
_CounterService=inject(CounterService)
add_to_wishlist(id:string):void
{

 this._WishlistService.add_wishlist(id).subscribe((res)=>{
  // console.log(res);
  this._CounterService.wishlist_count.set(res.data.length)

  
  this._ToastrService.success(res.message)
 })
}
add_to_cart(id:string):void
{
this._CartSerService.add_to_cart(id).subscribe((res)=>{
  // this._CounterService..set(res.data.length)
  this._CounterService.chenageData(res.numOfCartItems)
  // console.log(res);
  

  this._ToastrService.success(res.message)
 })
}

}
