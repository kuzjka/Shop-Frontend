import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/productService";
import {Brand} from "../../model/brand";
import {AddBrandComponent} from "../add-brand/add-brand.component";
import {BrandDto} from "../../dto/brandDto";
import {MatDialog} from "@angular/material/dialog";
import {DeleteBrandComponent} from "../delete-brand/delete-brand.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../service/userService";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  brandDto: BrandDto;
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  role!: string

  constructor(private userService: UserService,
              private productService: ProductService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.brandDto = new BrandDto(0, 0, '');
  }

  getRole() {
    this.role = this.userService.getRole();
  }

  getBrands() {
    this.productService.getAllBrands(0).subscribe(data => {
      this.brands = data;
    })
  }

  addBrand() {
    this.brandDto.id = 0;
    this.brandDto.typeId = 0;
    this.brandDto.name = '';
    const dialogRef = this.dialog.open(AddBrandComponent, {
      height: '500px',
      width: '500px',
      data: {
        brandDto: this.brandDto, new: true
      }
    }).afterClosed().subscribe(data => {
      this.productService.addBrand(data).subscribe(data => {
          this.getBrands();
        },
        error => {
          this.snackBar.open(error.error.message, '', {duration: 3000})
        }
      )
    })
  }

  editBrand(brand: Brand) {

    this.brandDto.id = brand.id;
    this.brandDto.name = brand.name;
    const dialogRef = this.dialog.open(AddBrandComponent, {
      height: '500px',
      width: '500px',
      data: {
        brandDto: this.brandDto, new: false
      }
    }).afterClosed().subscribe(data => {
      this.productService.editBrand(data).subscribe(data => {
          this.getBrands();
        },
        error => {
          this.snackBar.open(error.error.message, '', {duration: 3000})
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
      this.productService.deleteBrand(data).subscribe(data => {
          this.getBrands();
        }, error => {
          this.snackBar.open(error.error.message, '', {duration: 3000})
        }
      )
    })
  }

  ngOnInit(): void {
    this.getRole();
    this.getBrands();
  }
}
