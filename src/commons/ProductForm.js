import React, { Component, Fragment } from "react";
import {
  TextInput,
  Picker,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity
} from "react-native";
import { Box } from "react-native-design-utility";
import { Formik } from "formik";
import { ImagePicker } from "expo";
import { inject } from "mobx-react/native";

import * as Yup from "yup";

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
  category: Yup.string().required("Required"),
  imageUrl: Yup.mixed().required("Required")
});

const defaultValues = {
  name: "",
  imageUrl: null,
  unityPrice: "",
  kgPrice: "",
  cartQty: "",
  category: ""
};

const styles = StyleSheet.create({
  homeScreen: {
    height: 50,
    width: 300,
    textAlign: "center",
    color: "#8E8E93",
    fontSize: 16
  },
  toast: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  label: {
    color: "#66bb6a",
    fontSize: 17,
    fontWeight: "500"
  },
  imageUpload: {
    alignItems: "center",
    backgroundColor: "#bdbdbd",
    padding: 10,
    margin: 10
  },
  submit: {
    alignItems: "center",
    backgroundColor: "#66bb6a",
    padding: 10,
    margin: 10,
    width: 300
  },

  view: {
    marginBottom: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  pickerItem: {}
});

const Categories = [
  {
    name: "Grocery"
  },
  {
    name: "Bakery"
  },
  {
    name: "Dairy"
  },
  {
    name: "Meat"
  },
  {
    name: "Personal Care"
  }
];
@inject("productsStore")
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: "",
      image: null,
      category: ""
    };
  }

  _toastWithDurationGravityOffsetHandler = () => {
    ToastAndroid.showWithGravityAndOffset(
      this.state.message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

  _pickImage = async props => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      props.values.imageUrl = result.base64;
      this.setState({ image: result.base64 });
    }
  };

  handleSubmit = async (values, { resetForm }) => {
    try {
      const status = await this.props.productsStore.addProduct({
        ...values
      });
      status === "Ok"
        ? this.setState({ visible: true, message: "Product has been added" })
        : this.setState({ visible: true, message: "An error has occured" });
      resetForm({});
      this.setState({ image: null, category: "", visible: false });
    } catch (err) {
      console.log("error", err);
    }
  };

  onValueChange = (props, item) => {
    props.values.category = item;
    this.setState({ category: item });
  };

  render() {
    return (
      <Box f={1} center mt={75}>
        <Formik
          initialValues={defaultValues}
          validationSchema={ProductSchema}
          onSubmit={this.handleSubmit}
        >
          {props => {
            return (
              <Fragment>
                <View style={styles.view}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                    style={styles.homeScreen}
                    placeholder="Enter product name"
                  />
                  {props.errors.name && props.touched.name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {props.errors.name}
                    </Text>
                  )}
                </View>
                <View style={styles.view}>
                  <Text style={styles.label}>Unit Price</Text>
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
                </View>

                <View style={styles.view}>
                  <Text style={styles.label}>Price in kg</Text>
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
                </View>

                <View style={styles.view}>
                  <Text style={styles.label}>Total Quantity</Text>
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
                </View>

                <View>
                  <Text style={styles.label}>Category</Text>
                  <Picker
                    selectedValue={this.state.category}
                    onValueChange={this.onValueChange.bind(this, props)}
                    style={{ width: 300, height: 70, marginLeft: 0 }}
                  >
                    {Categories.map((category, i) => (
                      <Picker.Item
                        label={category.name}
                        value={category.name}
                        key={i}
                        style={styles.pickerItem}
                      />
                    ))}
                  </Picker>
                  {props.errors.category && props.touched.category && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {props.errors.category}
                    </Text>
                  )}
                </View>

                <View style={styles.view}>
                  <TouchableOpacity
                    onPress={this._pickImage.bind(this, props)}
                    style={styles.imageUpload}
                  >
                    <Text>Upload Image</Text>
                  </TouchableOpacity>
                  {props.values.imageUrl && (
                    <Image
                      source={{
                        uri: `data:image/png;base64,${this.state.image}`
                      }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                  {props.errors.imageUrl && props.touched.imageUrl && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {props.errors.imageUrl}
                    </Text>
                  )}
                </View>

                {this.state.visible &&
                  this._toastWithDurationGravityOffsetHandler()}
                <View style={styles.view}>
                  <TouchableOpacity
                    onPress={props.handleSubmit}
                    style={styles.submit}
                  >
                    <Text>Add Product</Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            );
          }}
        </Formik>
      </Box>
    );
  }
}

export default ProductForm;
