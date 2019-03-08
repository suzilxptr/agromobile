import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import CategoryCard from '../components/CategoryCard';
import { theme } from '../constants/theme';
import DealCaroussel from '../components/DealCaroussel';
import ProfileBtn from '../commons/ProfileBtn';

const categories = [
  {
    id: 1,
    title: 'Grocery',
    image: require('../../assets/img/grocery.png'),
  },
  {
    id: 2,
    title: 'Bakery',
    image: require('../../assets/img/bakery.png'),
  },
  {
    id: 3,
    title: 'Dairy',
    image: require('../../assets/img/dairy.png'),
  },
  {
    id: 4,
    title: 'Meat',
    image: require('../../assets/img/meat.png'),
  },
  {
    id: 5,
    title: 'Personal Care',
    image: require('../../assets/img/personalcare.png'),
  }
];

const NUM_COLUMNS = 3;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'AgroStore',
    headerLeft: <ProfileBtn />,
  };

  state = {};

  renderItem = ({ item, index }) => {
    let style = {};

    if (index % NUM_COLUMNS !== 0) {
      style.borderLeftWidth = 2;
      style.borderLeftColor = theme.color.greyLighter;
    }
    return (
      <Box w={1 / NUM_COLUMNS} bg="white" h={120} style={style}>
        <CategoryCard {...item} />
      </Box>
    );
  };

  keyExtractor = item => String(item.id);

  separator = () => <Box h={2} bg="greyLighter" />;

  render() {
    return (
      <Box f={1}>
        <StatusBar barStyle="light-content" />
        <Box h={130} bg="white" w={1}>
          <DealCaroussel />
        </Box>

        <Box f={1} p={10}>
          <FlatList
            data={categories}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            numColumns={NUM_COLUMNS}
            ItemSeparatorComponent={this.separator}
          />
        </Box>
      </Box>
    );
  }
}

export default HomeScreen;
