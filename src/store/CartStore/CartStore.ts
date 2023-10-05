import { action, computed, makeObservable, observable } from 'mobx';

import { ProductModel } from '@store/models/Products';

type PrivateFields = 'items';

export class CartStore {
  private items = observable.map();

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      items: observable.ref,

      total: computed,
      cartItems: computed,
      idArray: computed,

      addProduct: action,
      removeProduct: action,
      saveToLocalStorage: action,
      loadFromLocalStorage: action,
    });
    this.loadFromLocalStorage();
  }

  get cartItems() {
    return this.items;
  }

  get total() {
    let total = 0;
    this.items.forEach((product: ProductModel, count: number) => {
      total += product.price * count;
    });
    return total;
  }

  get idArray() {
    return Array.from(this.items.entries()).map((item) => item[0].id);
  }

  addProduct(product: ProductModel, count = 1) {
    const currentCount = this.items.get(product) || 0;
    this.items.set(product, currentCount + count);
    this.saveToLocalStorage();
  }

  removeProduct(product: ProductModel) {
    this.items.delete(product);
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('cart');
    if (data) {
      const items = JSON.parse(data);
      items.forEach(([productData, count]: [any, number]) => {
        const product = new ProductModel({
          id: productData.id,
          title: productData.title,
          price: productData._price,
          category: productData.category,
          description: productData.description,
          images: productData._images,
        });
        this.items.set(product, count);
      });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.items.entries())));
  }
}
