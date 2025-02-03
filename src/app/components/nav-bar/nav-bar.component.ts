import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartSerService } from '../../core/services/cart-ser.service';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { WishlistService } from './../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {

  newcounter=computed(()=>{return this._CartSerService.countCart();})
  count_wishlist:Signal<Number>=computed(()=>this._WishlistService.wishlistCounter())

  // private _count_wishlist Signal<number> = computed(() => this._CounterService.wishlist_count);
  res:any
  is_login: boolean = false;
  _PLATFORM_ID = inject(PLATFORM_ID);
  constructor(
    private _FlowbiteService: FlowbiteService,
    private _AuthService: AuthService,
    // private _CounterService: CounterService,
    private _WishlistService:WishlistService,
    private _CartSerService:CartSerService
  ) // private _CartComponent:CartComponent

  {
    //  if (typeof localStorage !=='undefined') {
      
    //   if(localStorage.getItem('couont'))
    //     {
    //       this.count=localStorage.getItem('couont');
    //     }


    // }
    
    this._AuthService.uer_info_form_token.subscribe(() => {
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        if (localStorage.getItem('userData')) this.is_login = true;
        else this.is_login = false;
      }
    });

   
    
  }
  // count_wishlist:Signal<Number>=computed(()=>this._CounterService.wishlist_count())
  // di(){
  //   const count_wishlist:Signal<Number>=computed(()=>this._CounterService.wishlist_count())
  //   console.log(count_wishlist());
    
  // }

  ngOnInit(): void {
    this._WishlistService.get_logged_user_wishlist().subscribe((res)=>{
      this.res=res
      // console.log(this.res.count);
      this._WishlistService.changeWishlistCounter(this.res.count);
      // this._CounterService.wishlist_count.set(this.res.count)
      // this.count_wishlist=this.res.count;
    })
    this._FlowbiteService.loadFlowbite(() => {});
    this._CartSerService.get_cart().subscribe({
      next:(res)=>{
        // console.log(res);
      this._CartSerService.changeCounter(res.numOfCartItems);

        // this._CounterService.counter_send.next(res.numOfCartItems)
        // this.Cart=res;
        // this.count.next(this.Cart.numOfCartItems);
        // if (this.Cart.numOfCartItems==0) {
        //   this.exist_cart=false;
        // }
       
    
      }
    })
    
    // this.count.subscribe((c)=>{
    //   console.log(c);

    //   this.count=c;
    // })
    //     this._CartComponent.count.subscribe((c)=>{
    // this.count=c;
    //     })
  }
  signOut() {
    this._AuthService.signOut();
  }
}
