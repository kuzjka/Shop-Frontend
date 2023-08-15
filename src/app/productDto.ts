export class ProductDto {
  typeId: number;
  brandId: number;
  id: number;
  name: string;
  price: number;


  constructor(typeId: number, brandId: number, id: number, name: string, price: number) {
    this.typeId = typeId;
    this.brandId = brandId;
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
