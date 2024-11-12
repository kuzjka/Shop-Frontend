import {Item} from "./item";

export interface Order {
  description: string;
  totalPrice: number;
  items: Item[];
}
