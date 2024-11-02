import {Item} from "./item";

export interface Cart {
  items: Item[];
  name: string;
  totalPrice: number;
}
