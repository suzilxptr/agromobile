import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { inject } from "mobx-react/native";

import ProductCard from "../components/ProductCard";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const styles = {
  flexbox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
};

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
      <ScrollView>
        {name === "Grocery" && (
          <View style={styles.flexbox}>
            {this.props.productsStore.grocery.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
        {name === "Dairy" && (
          <View style={styles.flexbox}>
            {this.props.productsStore.dairy.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
        {name === "Bakery" && (
          <View style={styles.flexbox}>
            {this.props.productsStore.bakery.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
        {name === "Meat" && (
          <View style={styles.flexbox}>
            {this.props.productsStore.meat.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
        {name === "Personal Care" && (
          <View style={styles.flexbox}>
            {this.props.productsStore.personalCare.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
      </ScrollView>
    );
  }
}

export default CategoryScreen;
