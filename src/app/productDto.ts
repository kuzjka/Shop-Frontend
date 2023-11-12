export class ProductDto {
  typeId: number;
  brandId: number;
  id: number;
  name: string;
  price: number;
  photos: string[];


  constructor(typeId: number, brandId: number, id: number, name: string, price: number, photos: string[]) {
    this.typeId = typeId;
    this.brandId = brandId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.photos = photos;
  }
}
