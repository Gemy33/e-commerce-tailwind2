import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../core/services/products.service';
import { product } from './../../core/interfaces/products/product';
import { CartSerService } from './../../core/services/cart-ser.service';
import { CounterService } from './../../core/services/counter.service';
// import * as catagorySer/vice from '../../core/services/catagory.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icaragory } from '../../core/interfaces/catagory/icaragory';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { catagoryService } from '../../core/services/catagories.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,NgClass, FormsModule, SearchPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // @ViewChildren('i') icons!: QueryList<ElementRef>;
// console.log(icons);
  
  
  activeElements:boolean[]=[];
  

  constructor(
    private _ProductsService: ProductsService,
    private _WishlistService: WishlistService,
    private _CounterService: CounterService,
    private _CatagoryService: catagoryService,
    private _CartSerService: CartSerService,
    private _ToastrService: ToastrService
  ) {}
  products: product[] = [];
  isFired: boolean = false;
  catagories: Icaragory[] = [];
  term: string = '';
  arrived: boolean = false;

  ngOnInit(): void {
    this.arrived = true;
    const savedStyles = JSON.parse(localStorage.getItem('activeElements')!);
    this.activeElements = savedStyles || new Array(this.products.length).fill(false);

    this._CatagoryService.get_all_catagory().subscribe({
      next: (res) => {
        // console.log(res);
        this.catagories = res.data;
        this.arrived = false;
      },
    });

    this._ProductsService.get_all_products().subscribe({
      next: (res) => {
        
        
        // this.icons.forEach((i) => {
          // console.log('kdfjkdjf', i);
        // });

        // console.log(res);
        this.products = res.data;
        // console.log(this.products);
      },
    });
  }

  show_details(pId: string): void {
    this._ProductsService.get_specific_product(pId).subscribe({
      next: (res) => {
        // console.log(res);
      },
    });
  }
  add_cart(pid: string): void {
    this.isFired = true;
    this._CartSerService.add_to_cart(pid).subscribe({
      next: (res) => {
        // console.log(res);
        this.isFired = false;
        this._CounterService.chenageData(res.numOfCartItems); //change here the data
        this._ToastrService.success('Product added successfully to your cart');
        // localStorage.setItem('couont',res.numOfCartItems)
      },
    });
  }
  add_to_wishlist(id: string): void {
    this._WishlistService.add_wishlist(id).subscribe((res) => {
      this._ToastrService.success(res.message);
      this._CounterService.wishlist_count.set(res.data.length);
      // console.log(res);

      console.log(res.data.length);
    });
  }
  add_style(id: string, index: any) {
    // this.icon.nativeElement.id=id;
    // console.log(this.icon.nativeElement);
    // console.log(index);

    this.add_to_wishlist(id);
    // this.redOrblack=true;
    localStorage.setItem('red', 'ture');
   this.toggleStyle(index)
  }
  toggleStyle(index: number) {
    // Toggle the style for a specific element
    this.activeElements[index] = !this.activeElements[index];
    // console.log(this.);
    
    // Save the updated state to localStorage
    localStorage.setItem('activeElements', JSON.stringify(this.activeElements));
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 800,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  customOptions_cat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 800,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
}
