import { tesloApi } from '@/api/teslo.api';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image-url.action';

export const getProductByIdAction = async (id: string) => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting product');
  }
};
