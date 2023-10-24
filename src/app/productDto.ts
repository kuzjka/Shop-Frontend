export class ProductDto {
  typeId: number;
  brandId: number;
  id: number;
  name: string;
  price: number;
  photo:string | ArrayBuffer | null;


  constructor(typeId: number, brandId: number, id: number, name: string, price: number, photo: string) {
    this.typeId = typeId;
    this.brandId = brandId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.photo = photo;
  }
}
