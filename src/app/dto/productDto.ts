export class ProductDto {
  productId: number;
  typeId: number;
  brandId: number;
  name: string;
  price: number;
  photo: File;


  constructor(typeId: number, brandId: number, productId: number, name: string, price: number, photo: File) {
    this.typeId = typeId;
    this.brandId = brandId;
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.photo = photo;
  }
}
