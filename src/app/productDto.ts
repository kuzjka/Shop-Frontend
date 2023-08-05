export class ProductDto{
  typeId:number;
  brandId:number;
  id:number;
  name:string;


  constructor(typeId: number, brandId: number, id: number, name: string) {
    this.typeId = typeId;
    this.brandId = brandId;
    this.id = id;
    this.name = name;
  }
}
