import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  View,
  Dimensions
} from "react-native";
import { Box, Text } from "react-native-design-utility";
import { observer } from "mobx-react/native";
import { Feather } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import QtyHover from "./QtyHover";

const ANIM_DURATION = 200;

const BoxAnimated = Animated.createAnimatedComponent(Box);
const width = Dimensions.get("window").width;

@observer
class ProductCard extends Component {
  state = {
    isHover: false,
    cardOpacity: new Animated.Value(1)
  };

  handlePlusPress = () => {
    this.fadeIn();
    this.setState({ isHover: true });
    if (this.props.product.cartQty === 0) {
      this.props.product.addToCart();
    }
  };

  handleInc = () => {
    this.props.product.incCartQty();
  };

  handleDec = () => {
    this.props.product.decCartQty();
  };

  handleClose = () => {
    this.fadeOut();
    this.setState({
      isHover: false
    });
  };

  handleRemove = () => {
    this.handleClose();
    this.props.product.removeFromCart();
  };

  fadeIn = () => {
    Animated.timing(this.state.cardOpacity, {
      toValue: 0.4,
      duration: ANIM_DURATION
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.cardOpacity, {
      toValue: 1,
      duration: ANIM_DURATION
    }).start();
  };

  render() {
    const { isHover, cardOpacity } = this.state;
    const { product } = this.props;
    return (
      <View
        style={{
          width: width / 2,
          height: 250,
          backgroundColor: "white",
          marginBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
          borderRightWidth: 2,
          borderColor: "#eeeeee"
        }}
      >
        <TouchableWithoutFeedback onPress={this.handleClose}>
          <BoxAnimated o={cardOpacity}>
            <View>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={{ uri: `data:image/png;base64,${product.imageUrl}` }}
              />
            </View>
            <View>
              <Text left size="sm" bold>
                €{product.price} each
              </Text>
              <Text left size="xs">
                {product.name}
              </Text>
              <Text left size="xs" color="blueDarker">
                At €{product.kgPrice.toFixed(2)}
                /kg
              </Text>
            </View>
          </BoxAnimated>
        </TouchableWithoutFeedback>
        {!isHover && (
          <TouchableOpacity
            onPress={this.handlePlusPress}
            style={styles.plusBtn}
          >
            <Box
              circle={25}
              style={{
                borderColor: theme.color.green,
                borderWidth: 1
              }}
              center
              bg={product.cartQty > 0 ? "green" : "white"}
            >
              {product.cartQty > 0 ? (
                <Text color="white" size="sm">
                  {product.cartQty}
                </Text>
              ) : (
                <Feather name="plus" size={15} color={theme.color.green} />
              )}
            </Box>
          </TouchableOpacity>
        )}
        {isHover && (
          <QtyHover
            qty={product.cartQty}
            handleRemove={this.handleRemove}
            handleInc={this.handleInc}
            handleDec={this.handleDec}
            containerStyle={{ top: 10, right: 10, left: 10, zIndex: 99 }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 175
  },
  plusBtn: {
    top: 10,
    right: 5,
    position: "absolute"
  }
});

export default ProductCard;
