import { tesloApi } from '@/api/teslo.api';
import type { Product, ProductDto } from '../interfaces/product.interface';

export const createProductAction = async (product: ProductDto) => {
  try {
    const { data } = await tesloApi.post<Product>('/products', product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};

export const updateProductAction = async (product: ProductDto, id: string) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${id}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};
