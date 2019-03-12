import React, { Component, Fragment } from "react";
import {
  StatusBar,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ToastAndroid
} from "react-native";
import { Box } from "react-native-design-utility";
import { Formik } from "formik";
import { inject } from "mobx-react/native";
import * as Yup from "yup";

const defaultValues = {
  name: "",
  imageUrl: "",
  unityPrice: "",
  kgPrice: "",
  cartQty: ""
};

const styles = StyleSheet.create({
  homeScreen: {
    height: 40,
    width: 400,
    marginBottom: 10,
    textAlign: "center"
  },
  toast: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  unityPrice: Yup.number()
    .min(0, "Quantity must be larger than 0.")
    .required("Required")
    .positive("Number cannot be negative"),
  kgPrice: Yup.number()
    .min(0, "Price must be larger than 0.")
    .required("Required")
    .positive("Number cannot be negative"),
  cartQty: Yup.number()
    .min(2, "Quantity must be larger than 0.")
    .required("Required")
    .positive("Number cannot be negative"),
  imageUrl: Yup.number()
    .min(0, "Quantity must be larger than 0.!")
    .required("Required")
    .positive("Number cannot be negative")
});

@inject("productsStore")
class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: ""
    };
  }

  _toastWithDurationGravityOffsetHandler = () => {
    ToastAndroid.showWithGravityAndOffset(
      this.state.message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

  handleSubmit = async (values, { resetForm }) => {
    console.log("the values", values);
    try {
      const status = await this.props.productsStore.addProduct(values);
      status === "Ok"
        ? this.setState({ visible: true, message: "Product has been added" })
        : this.setState({ visible: true, message: "An error has occured" });
      resetForm({});
    } catch (err) {
      console.log("error", err);
    }
  };

  render() {
    return (
      <Box f={1} center>
        <StatusBar barStyle="light-content" />

        <Formik
          initialValues={defaultValues}
          validationSchema={ProductSchema}
          onSubmit={this.handleSubmit}
        >
          {props => (
            <Fragment>
              <TextInput
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
                style={styles.homeScreen}
                placeholder="Enter product names"
              />
              {props.errors.name && props.touched.name && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.name}
                </Text>
              )}
              <TextInput
                onChangeText={props.handleChange("unityPrice")}
                onBlur={props.handleBlur("unityPrice")}
                value={props.values.unityPrice}
                keyboardType="numeric"
                style={styles.homeScreen}
                placeholder="Enter price per unit"
              />
              {props.errors.unityPrice && props.touched.unityPrice && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.unityPrice}
                </Text>
              )}

              <TextInput
                onChangeText={props.handleChange("kgPrice")}
                onBlur={props.handleBlur("kgPrice")}
                value={props.values.kgPrice}
                keyboardType="numeric"
                style={styles.homeScreen}
                placeholder="Enter price per kg"
              />
              {props.errors.kgPrice && props.touched.kgPrice && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.kgPrice}
                </Text>
              )}
              <TextInput
                onChangeText={props.handleChange("cartQty")}
                onBlur={props.handleBlur("cartQty")}
                value={props.values.cartQty}
                keyboardType="numeric"
                style={styles.homeScreen}
                placeholder="Enter total quantity"
              />
              {props.errors.cartQty && props.touched.cartQty && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.cartQty}
                </Text>
              )}

              <TextInput
                onChangeText={props.handleChange("imageUrl")}
                onBlur={props.handleBlur("imageUrl")}
                value={props.values.imageUrl}
                keyboardType="numeric"
                style={styles.homeScreen}
                placeholder="Enter total quantity"
              />
              {props.errors.imageUrl && props.touched.imageUrl && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {props.errors.imageUrl}
                </Text>
              )}
              {this.state.visible &&
                this._toastWithDurationGravityOffsetHandler()}
              <Button onPress={props.handleSubmit} title="Add Product" />
            </Fragment>
          )}
        </Formik>
      </Box>
    );
  }
}

export default ListScreen;
