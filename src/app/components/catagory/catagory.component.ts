import { Component, inject } from '@angular/core';
import { catagoryService } from '../../core/services/catagories.service';
import { Icaragory } from '../../core/interfaces/catagory/icaragory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catagory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catagory.component.html',
  styleUrl: './catagory.component.scss'
})
export class CatagoryComponent {
  all_catagory:Icaragory[]=[]
  all_sup:any[]=[];
  _CatagoryService=inject(catagoryService)
  ngOnInit(){
    this._CatagoryService.get_all_catagory().subscribe((res)=>{
      // console.log(res.data);
      this.all_catagory=res.data;
      // console.log(this.all_catagory);
      
      
    })
  }
  is_sup:boolean=false;
  text:string='';
  show_sup(id:string,text:string){
    this.is_sup=true
    this.text=text;
    this._CatagoryService.get_sup_on_cat(id).subscribe((res)=>{
      this.all_sup=res.data
      // console.log(res.data);
      
    })

  }
}
