import { action, computed, observable } from 'mobx';

export class ProductModel {
  @observable id: number;

  @observable title: string;

  @observable private _price: number;

  @observable category: {
    id: number;
    name: string;
    image: string;
  };

  @observable description: string;

  @observable private _images: string[];

  constructor(data: {
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
  }) {
    this.id = data.id;
    this.title = data.title;
    this._price = data.price;
    this.category = data.category;
    this.description = data.description;
    this._images = data.images;
  }

  @computed get price(): string {
    // Тут можно добавить логику по форматированию цены, сейчас просто добавим знак доллара
    return `$${this._price.toFixed(2)}`;
  }

  @computed get image(): string[] | null {
    return this._images.length > 0 ? this._images : null;
  }

  @action setPrice(price: number): void {
    this._price = price;
  }

  @action setImages(images: string[]): void {
    this._images = images;
  }

  clone(): ProductModel {
    return new ProductModel({
      id: this.id,
      title: this.title,
      price: this._price,
      category: { ...this.category },
      description: this.description,
      images: [...this._images],
    });
  }

  serializeForAPI(): object {
    return {
      id: this.id,
      title: this.title,
      price: this._price,
      category: this.category,
      description: this.description,
      images: this._images,
    };
  }
}
