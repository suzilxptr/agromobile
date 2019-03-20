import { types, flow } from "mobx-state-tree";
import { productApi } from "../api/Api";
import { ProductModel } from "../models/Product";

export const ProductsStore = types
  .model("ProductsStore", {
    data: types.array(types.reference(ProductModel)),
    grocery: types.array(types.reference(ProductModel)),
    bakery: types.array(types.reference(ProductModel)),
    dairy: types.array(types.reference(ProductModel)),
    personalCare: types.array(types.reference(ProductModel)),
    meat: types.array(types.reference(ProductModel))
  })
  .actions(self => ({
    getAllProducts: flow(function*() {
      try {
        const res = yield productApi.get().json();
        let products = res.products.map(product => {
          const createdProduct = createProduct(product);
          self.addToCategory(createdProduct);
          return createdProduct;
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
        self.addToCategory(newProduct);
        return "Ok";
      } catch (err) {
        console.log("error", err);
      }
    }),

    addToCategory: newProduct => {
      switch (newProduct.category) {
        case "Grocery":
          self.grocery.push(newProduct);
          break;
        case "Bakery":
          self.bakery.push(newProduct);
          break;
        case "Dairy":
          self.dairy.push(newProduct);
          break;
        case "Meat":
          self.meat.push(newProduct);
          break;
        case "Personal Care":
          self.personalCare.push(newProduct);
      }
    }
  }));

createProduct = product => {
  return ProductModel.create({
    id: product._id,
    name: product.name,
    imageUrl: product.imageUrl,
    kgPrice: product.kgPrice,
    unityPrice: product.unityPrice,
    category: product.category
  });
};
