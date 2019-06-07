import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    if(vatPercentage===20){
       return priceInclusiveVat / 120 * 100;
    } else if(vatPercentage===10){
      return priceInclusiveVat / 110 * 100;
    }
    return NaN;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    let invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0
    };

      for(let i = 0;i<invoiceLines.length;i++){

        let vat = this.vatCategoriesService.getVat(invoiceLines[i].vatCategory);
        let priceExclusiveVat = this.CalculatePriceExclusiveVat(invoiceLines[i].priceInclusiveVat, vat);
        let lineComplete: InvoiceLineComplete = {
          product: invoiceLines[i].product,
          vatCategory: invoiceLines[i].vatCategory,
          priceInclusiveVat: invoiceLines[i].priceInclusiveVat,
          priceExclusiveVat
        };
        invoice.invoiceLines.push(lineComplete);
        invoice.totalPriceExclusiveVat += lineComplete.priceExclusiveVat;
        invoice.totalPriceInclusiveVat += lineComplete.priceInclusiveVat;
        invoice.totalVat += vat;
      }
    return invoice;
  }
}
