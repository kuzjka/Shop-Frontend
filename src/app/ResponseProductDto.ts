import {Product} from "./product";

export interface ResponseProductDto{
  products:Product[];
  pageSize:number;
  totalProducts:number;
}
