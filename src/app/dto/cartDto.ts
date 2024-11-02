import {Item} from "../model/item";

export class CartDto {
  items:Item[];
  constructor(items: Item[]) {
    this.items = items;
  }
}
