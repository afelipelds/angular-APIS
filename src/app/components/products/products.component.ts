import { Component, OnInit } from '@angular/core';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  initialTitle: string = 'No hay elementos';
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  getProductsByPage(limit: number, offset: number) {
    return this.productsService
      .getProductsByPage(limit, offset)
      .subscribe((data) => {
        this.products = offset !== 0 ? this.products.concat(data) : data;
      });
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // This calls only ten products when is the first change of the page on screen
    this.getProductsByPage(this.limit, this.offset);
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  readAndUpdate(id: string) {
    this.productsService
      .getProductId(id)
      .pipe(
        switchMap((product) => {
          return this.productsService.updateProduct(product.id, {
            title: 'A great number of cases were found beneath the sun',
          });
        }),
        switchMap((product) => {
          return this.productsService.updateProduct(product.id, {
            taxes: 2.01,
          });
        }),
        switchMap((product) => {
          return this.productsService.updateProduct(product.id, {
            price: 450,
          });
        })
      )
      .subscribe((data) => {
        console.log('data', { data });
      });
    zip(
      this.productsService.getProductId(id),
      this.productsService.updateProduct(id, {
        title: 'A great number of cases were found beneath the sun',
      })
    ).subscribe((response) => {
      const readDataResponse = response[0];
      const updatedDataResponse = response[1];
    });
  }

  onShowProductDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProductId(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (response) => {
        this.statusDetail = 'error';
        console.log('error occurred: ', response);
      }
    );
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'new product',
      description: 'This is the description of the new product',
      images: ['https://picsum.photos/640/640'],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.createProduct(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const id = this.productChosen.id;
    const changes: UpdateProductDTO = {
      title: 'Este es el nuevo change del title',
    };

    this.productsService.updateProduct(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (items) => items.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (items) => items.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMoreProducts() {
    this.getProductsByPage(this.limit, (this.offset += this.limit));
  }
}
