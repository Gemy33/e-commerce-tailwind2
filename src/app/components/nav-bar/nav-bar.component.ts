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

  ngOnInit(): void {
    this._WishlistService.get_logged_user_wishlist().subscribe((res)=>{
      this.res=res
      this._WishlistService.changeWishlistCounter(this.res.count);
    })
    this._FlowbiteService.loadFlowbite(() => {});
    this._CartSerService.get_cart().subscribe({
      next:(res)=>{
        // console.log(res);
      this._CartSerService.changeCounter(res.numOfCartItems);
      }
    })

  }

  signOut() {
    this._AuthService.signOut();
  }
}
