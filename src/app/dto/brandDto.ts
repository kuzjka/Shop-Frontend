export class BrandDto {
  id: number;
  typeId: number;
  name: string;


  constructor(id: number, typeId: number, name: string) {
    this.id = id;
    this.typeId = typeId;
    this.name = name;
  }
}
