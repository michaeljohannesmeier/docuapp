import { CanDeactivate } from "@angular/router";  
import { Injectable } from "@angular/core";  
import { Observable } from "rxjs";  
  
export interface ComponentCanDeactivate {  
  componentCanDeactivate: () => boolean ;  
}  
  
@Injectable()  
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {  
  constructor() {  
  
  }  
  
  canDeactivate(  
    component: ComponentCanDeactivate  
  ): Observable<boolean> | Promise<boolean> | boolean {  
     
      return component.componentCanDeactivate()  
        ? true  
        : confirm(  
            "WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to loose these changes."  
        );     
  }
}  