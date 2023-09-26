import { ProductModel } from './ProductModel';

export type RawProductAPI = {
  id: number;
  title: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  description: string;
  images: string[];
};

export const normalizeRawProduct = (from: RawProductAPI): ProductModel => new ProductModel(from);
