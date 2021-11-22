import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cardItemList : any = [];
  productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProducts(product: any){
    this.cardItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any){
    this.cardItemList.push(product);
    this.productList.next(this.cardItemList);
    this.getTotalPrice();
  }

  getTotalPrice() : number{
    let granTotal = 0;
    this.cardItemList.map((a:any)=>{
      granTotal+=a.total;
    })
    return granTotal;
  }

  removeCartItem(product:any){
    this.cardItemList.map((a: any, index:any) =>{
      if(product.id === a.id){
        this.cardItemList.splice(index,1);
      }
    })
    this.productList.next(this.cardItemList);
  }

  removeAllCart(){
    this.cardItemList = [];
    this.productList.next(this.cardItemList);
  }
}
