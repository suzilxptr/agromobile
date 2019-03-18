import React, { Component, Fragment } from "react";
import { StatusBar, ScrollView } from "react-native";
import { Box } from "react-native-design-utility";
import { inject } from "mobx-react/native";
import ProductForm from "../commons/ProductForm";

@inject("productsStore")
class ListScreen extends Component {
  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ProductForm />
      </ScrollView>
    );
  }
}

export default ListScreen;
