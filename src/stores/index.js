import { AuthStore } from './Auth';
import { ProductsStore } from './Products';
import { ShoppingCartStore } from './ShoppingCart';
import { ProductModel } from '../models/Product';

const authStore = AuthStore.create();

const shoppingCartStore = ShoppingCartStore.create({ products: [] });

const productsStore = ProductsStore.create({
  data: [
    
    ProductModel.create({
      id: '1',
      name: 'Banana',
      imageUrl: require('../../assets/img/products/banana.png'),
      kgPrice: 2.32,
      unityPrice: 0.35,
    }),
    ,
    ProductModel.create({
      id: '2',
      name: 'Tomato',
      imageUrl: require('../../assets/img/products/tomato.png'),
      kgPrice: 3.51,
      unityPrice: 0.45,
    }),
  ],
});

export const store = {
  authStore,
  shoppingCartStore,
  productsStore,
};

window.MobxStore = store;
