import { inject, Injectable, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartSerService } from './cart-ser.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
// import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

     counter_send:BehaviorSubject<any>;
    //  wishlist_count:BehaviorSubject<number>=new BehaviorSubject(0)
    wishlist_count:WritableSignal<number>=signal(0)

   private _PLATFORM_ID=inject(PLATFORM_ID)
  constructor() { 
    const initialValue = isPlatformBrowser(this._PLATFORM_ID)
      ? localStorage.getItem('couont') || '0' : '0';
    this.counter_send = new BehaviorSubject<string>(initialValue);
    
  }

  chenageData(new_value:any)
  {
    this.counter_send.next(new_value);
    if (isPlatformBrowser(this._PLATFORM_ID)) {
        localStorage.setItem('couont', new_value);
      }
  }
  
}
