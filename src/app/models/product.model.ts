export interface Category {
  id: string | number;
  name: string;
  typeImg?: string;
  creationAt?: string;
  updatedAt?: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  creationAt?: string;
  updatedAt?: string;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
