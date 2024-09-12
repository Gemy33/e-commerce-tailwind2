import { Component, inject } from '@angular/core';
import { Icaragory } from '../../core/interfaces/catagory/icaragory';
import { BrandsService } from '../../core/services/brands.service';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private _flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(()=>{})
    // this.flowbiteService.loadFlowbite(flowbite => {
    //   // Your custom code here
    //   console.log('Flowbite loaded', flowbite);
    // });
    this._BrandsService.get_all_brands().subscribe((res)=>{
      // console.log(res);
      this.all_brands=res.data;
      
    })
  }
  all_brands:Icaragory[]=[];
  // _FlowbiteService=inject(FlowbiteService)
  _BrandsService=inject(BrandsService)

  src:string='';
  name:string=''
show_brands(src:string,name:string)
{
  this.src=src;
  this.name=name

}
}
