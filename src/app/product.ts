import {Type} from "./type";
import {Brand} from "./brand";

export interface Product {
  id: number;
  name: string;
  type:Type;
  brand:Brand;
}
