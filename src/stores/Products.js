import { types, flow } from "mobx-state-tree";
import { productApi } from "../api/Api";
import { ProductModel } from "../models/Product";

export const ProductsStore = types
  .model("ProductsStore", {
    data: types.array(types.reference(ProductModel))
  })
  .actions(self => ({
    getAllProducts: flow(function*() {
      try {
        const res = yield productApi.get().json();
        let products = res.products.map(product => {
          return createProduct(product);
        });
        self.data = products;
      } catch (err) {
        console.log("error", err);
      }
    }),
    addProduct: flow(function*(p) {
      try {
        const res = yield productApi.post(p).json();
        const newProduct = createProduct(res.product);
        self.data.push(newProduct);
        return "Ok";
      } catch (err) {
        console.log("error", err);
      }
    })
  }));

createProduct = product => {
  return ProductModel.create({
    id: product._id,
    name: product.name,
    imageUrl: 2,
    kgPrice: product.kgPrice,
    unityPrice: product.unityPrice
  });
};
