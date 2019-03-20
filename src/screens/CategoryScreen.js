import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import { ScrollView, View } from "react-native";
import { inject } from "mobx-react/native";

import ProductCard from "../components/ProductCard";

@inject("productsStore")
class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("name", "AgroStore")
  });

  state = {};
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name");
    return (
      <Box>
        {name === "Grocery" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.productsStore.grocery.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        )}
        {name === "Dairy" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.productsStore.dairy.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        )}
        {name === "Bakery" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.productsStore.bakery.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        )}
        {name === "Meat" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.productsStore.meat.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        )}
        {name === "Personal Care" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.props.productsStore.personalCare.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        )}
      </Box>
    );
  }
}

export default CategoryScreen;
