import {Product} from "../model/product";

export interface ResponseProductDto {
  products: Product[];
  pageSize: number;
  totalProducts: number;
}
