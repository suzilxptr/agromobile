import { AuthStore } from './Auth';
import { ProductsStore } from './Products';
import { ShoppingCartStore } from './ShoppingCart';

const authStore = AuthStore.create();

const shoppingCartStore = ShoppingCartStore.create({ products: [] });

let productsStore= ProductsStore.create({
  data: []
});

export const store = {
  authStore,
  shoppingCartStore,
  productsStore,
};

window.MobxStore = store;


