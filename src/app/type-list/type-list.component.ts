import {Component, OnInit} from '@angular/core';
import {Type} from "../type";
import {Service} from "../service";
import {AddTypeComponent} from "../add-type/add-type.component";
import {MatDialog} from "@angular/material/dialog";
import {TypeDto} from "../typeDto";
import {Product} from "../product";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {DeleteTypeComponent} from "../delete-type/delete-type.component";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  types: Type[] = [];
  typeDto!: TypeDto;

  constructor(private service: Service, private dialog: MatDialog) {
    this.typeDto = new TypeDto(0, '');
  }

  getTypes() {
    this.service.getAllTypes().subscribe(data => {
      this.types = data;
    })
  }

  addType() {
    this.typeDto.id = 0;
    this.typeDto.name = '';

    const dialogRef = this.dialog.open(AddTypeComponent, {
      height: '500px',
      width: '500px',
      data: {
        type: this.typeDto, new: true
      }
    }).afterClosed().subscribe(data => {
      this.service.addType(data).subscribe(data => {
        this.getTypes();

      })
    })
  }

  editType(type: Type) {
    this.typeDto.id = type.id;
    this.typeDto.name = type.name;

    const dialogRef = this.dialog.open(AddTypeComponent, {
      height: '500px',
      width: '500px',
      data: {
        type: this.typeDto, new: false
      }
    }).afterClosed().subscribe(data => {
      this.service.editType(data).subscribe(data => {
        this.getTypes();
      })
    })
  }
  deleteType(type: Type) {
    const dialogRef= this.dialog.open(DeleteTypeComponent, {
      height: '500px',
      width: '500px',
      data: {
        type: type
      }
    }).afterClosed().subscribe(data => {
      this.service.deleteType(data).subscribe(data => {

        this.getTypes();
      })
    })
  }
  ngOnInit(): void {
    this.getTypes();
  }
}
