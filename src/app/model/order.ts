import {Item} from "./item";

export interface Order {
  description: string;
  totalPrice: number;
  totalQuantity: number;
  items: Item[];
}
