import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../core/interfaces/products/product';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { BrandsService } from '../../core/services/brands.service';
import { CartSerService } from '../../core/services/cart-ser.service';
import { catagoryService } from '../../core/services/catagories.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  display_text: string = '';
  _ActivatedRoute = inject(ActivatedRoute);
  _catagoryService = inject(catagoryService);
  _BrandsService = inject(BrandsService);
  term!: string;
  products: product[] = [];
  ngOnInit(): void {
    this._ProductsService.get_all_products().subscribe((res) => {
      // console.log(res.data);
      this.products = res.data;
      // console.log(this.products[0]);
      this._ActivatedRoute.paramMap.subscribe((res) => {
        if (res.get('id')) {
          this._catagoryService
            .get_specfic_cat(res.get('id')!)
            .subscribe((res) => {
              console.log(res.data.name.split('', 3).join(''));
              this.display_text = res.data.name.split('', 3).join('');
              // console.log(this.display_text.name);

              this.products = this.products.filter(
                (p) =>
                  p.category.name.split('', 3).join('') === this.display_text
              );
              console.log(this.products);
            });
        }
      });
    });
  }
  _ProductsService = inject(ProductsService);
  _ToastrService = inject(ToastrService);
  _WishlistService = inject(WishlistService);
  _CartSerService = inject(CartSerService);
  add_to_wishlist(id: string): void {
    this._WishlistService.add_wishlist(id).subscribe((res) => {
      // console.log(res);
      // this._CounterService.wishlist_count.set(res.data.length)
      this._WishlistService.changeWishlistCounter(res.data.length);

      this._ToastrService.success(res.message);
    });
  }
  add_to_cart(id: string): void {
    this._CartSerService.add_to_cart(id).subscribe((res) => {
      // this._CounterService..set(res.data.length)
      // this._CounterService.chenageData(res.numOfCartItems)
      // console.log(res);
      this._CartSerService.changeCounter(res.numOfCartItems);

      this._ToastrService.success(res.message);
    });
  }
  prvnum:number=1;
  getProduct(num:number):void{
    
    this.prvnum=num;
    this._ProductsService.get_second_all_products(num).subscribe((res)=>{
      console.log(res);
      this.products=res.data;
      window.scrollTo(0, 0);
      
    })
  }
  getProduct1():void{
    if(this.prvnum==1)
      this.prvnum= this.prvnum+1;
    else
    this.prvnum= this.prvnum-1;
    this._ProductsService.get_second_all_products(this.prvnum).subscribe((res)=>{
      console.log(res);
      this.products=res.data;
      window.scrollTo(0, 0);
      
    })
  }
@ViewChild('a1') a1!:ElementRef;
@ViewChild('a2') a2!:ElementRef;
  changeStyle():void{
    // console.log(this.a1.nativeElement);
    this.a2.nativeElement.classList.toggle('bg-gray-800');
    this.a1.nativeElement.classList.toggle('bg-gray-800');
    // console.log(this.a2.nativeElement.classList);
    
  
    
  }
}
