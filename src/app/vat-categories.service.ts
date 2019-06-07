import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks,
  Plants
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    let vat = 0;
    if(category==VatCategory.Drinks){
      return vat=10;
    } else if(category==VatCategory.Food){
       return vat=20;
    } else if(category==VatCategory.Plants){
      return vat=13;
    }
    return NaN;
  }
}
