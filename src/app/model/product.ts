import {Type} from "./type";
import {Brand} from "./brand";
import {Photo} from "./photo";
import {CartItem} from "./cartItem";

export interface Product {
  id: number;
  name: string;
  price: number;
  photos: Photo[];
  type: Type;
  brand: Brand;

}
