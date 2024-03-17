export class ProductDto {
  id: number;
  typeId: number;
  brandId: number;
  name: string;
  price: number;


  constructor(id: number, typeId: number, brandId: number, name: string, price: number) {
    this.id = id;
    this.typeId = typeId;
    this.brandId = brandId;
    this.name = name;
    this.price = price;
  }
}
