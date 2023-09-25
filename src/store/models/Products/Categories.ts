export type RawCategoriesAPI = {
  id: number;
  name: string;
  image: string;
};

export type RawCategoriesModel = {
  id: number;
  name: string;
  image: string;
};

export const normalizeRawCategories = (from: RawCategoriesAPI): RawCategoriesModel => ({
    id: from.id,
    name: from.name,
    image: from.image,
  });