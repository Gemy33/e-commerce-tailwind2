import { error } from 'node:console';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService=inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    
    // console.log(err);
      
    //   _ToastrService.error(err,err.error.message)
    
    return throwError(()=>err)
  }))
  



  
};
