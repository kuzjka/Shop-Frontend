import {Component, OnInit} from '@angular/core';
import {Service} from "../service";
import {Brand} from "../brand";
import {AddBrandComponent} from "../add-brand/add-brand.component";
import {BrandDto} from "../brandDto";
import {MatDialog} from "@angular/material/dialog";
import {Type} from "../type";
import {DeleteTypeComponent} from "../delete-type/delete-type.component";
import {DeleteBrandComponent} from "../delete-brand/delete-brand.component";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  dto: BrandDto;

  constructor(private service: Service, private dialog: MatDialog) {
    this.dto = new BrandDto(0, '');
  }

  getBrands() {
    this.service.getAllBrands().subscribe(data => {
      this.brands = data;
    })
  }

  addBrand() {
    this.dto.id = 0;
    this.dto.name = '';

    const dialogRef = this.dialog.open(AddBrandComponent, {
      height: '500px',
      width: '500px',
      data: {
        brand: this.dto, new: true
      }
    }).afterClosed().subscribe(data => {
      this.service.addBrand(data).subscribe(data => {
        this.getBrands();

      })
    })
  }

  editBrand(brand: Brand) {
    this.dto.id = brand.id;
    this.dto.name = brand.name;

    const dialogRef = this.dialog.open(AddBrandComponent, {
      height: '500px',
      width: '500px',
      data: {
        brand: this.dto, new: false
      }
    }).afterClosed().subscribe(data => {
      this.service.editBrand(data).subscribe(data => {
        this.getBrands();

      })
    })
  }
  deleteBrand(brand: Brand) {
    const dialogRef = this.dialog.open(DeleteBrandComponent, {
      height: '500px',
      width: '500px',
      data: {
        brand: brand
      }
    }).afterClosed().subscribe(data => {
      this.service.deleteBrand(data).subscribe(data => {
        this.getBrands();
      })
    })
  }
  ngOnInit(): void {
    this.getBrands();
  }
}
