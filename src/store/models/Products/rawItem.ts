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

export type RawProductModel = {
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

export const normalizeRawProduct = (from: RawProductAPI): RawProductModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  category: from.category,
  description: from.description,
  images: from.images,
});