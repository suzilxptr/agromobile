import { types, flow } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import { productApi } from '../api/Api';
import { store } from '../stores';
import { ProductModel } from '../models/Product';

export const ProductsStore = types
.model('ProductsStore', {
  data: types.array(types.reference(ProductModel)),
})
.actions(self => ({
    getAllProducts: flow(function*() {
      try {
        const res = yield productApi.get().json();
        let products = res.products.map( (product , i) => {
          return ProductModel.create({
            id: product._id,
            name: product.name,
            imageUrl: i + 2,
            kgPrice: product.kgPrice,
            unityPrice: product.unityPrice,
          });
        });
        self.data = products;
      } catch (err) {
        console.log('error', err);
      }
    }),
}))
