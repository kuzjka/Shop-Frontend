import {Type} from "./type";
import {Brand} from "./brand";
import {Photo} from "./photo";

export interface Product {
  id: number;
  name: string;
  price: number;
  url: string;
  type: Type;
  brand: Brand;
}
