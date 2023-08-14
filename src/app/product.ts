import {Type} from "./type";
import {Brand} from "./brand";

export interface Product {
  id: number;
  name: string;
  price: number;
  type: Type;
  brand: Brand;
}
