export class TypeDto {
  id: number;
  brandId: number;
  name: string;


  constructor(id: number, brandId: number, name: string) {
    this.id = id;
    this.brandId = brandId;
    this.name = name;
  }
}
