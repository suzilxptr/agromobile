import React, { Component, Fragment } from "react";
import { StatusBar, ScrollView } from "react-native";
import ProductForm from "../commons/ProductForm";

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
