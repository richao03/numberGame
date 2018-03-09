import React, { Component } from 'react';
import { Image, Text, View, ScrollView, StyleSheet, contentContainerStyle, TouchableOpacity } from 'react-native';
import { array, func } from 'prop-types';
import { styles } from './styles/KategorySearch';

const kategoriesList = {
  mens: {
    text: `Mens Clothing`,
    icon: require('../assets/icons/tshirt.png')
  },
  "women's": {
    text: `Women's Clothing`,
    icon: require('../assets/icons/undershirt.png')
  },
  travel: {
    text: 'Travel & Vacations',
    icon: require('../assets/icons/airplane.png')
  },
  electronics: {
    text: 'Electronics & Computers',
    icon: require('../assets/icons/electronicsComputers.png')
  },
  health: {
    text: 'Health & Beauty',
    icon: require('../assets/icons/healthBeauty.png')
  },
  shoes: {
    text: 'Shoes & Handbags',
    icon: require('../assets/icons/shoesHandbag.png')
  },
  baby: {
    text: 'Baby, Kids & Toys',
    icon: require('../assets/icons/babyKidsToys.png')
  },
  home: {
    text: 'Home, Garden & Tools',
    icon: require('../assets/icons/homeGardenTools.png')
  },
  sports: {
    text: 'Sports & Outdoors',
    icon: require('../assets/icons/sportsOutdoors.png')
  },
  food: {
    text: 'Food & Restaurants',
    icon: require('../assets/icons/foodRestaurants.png')
  },
  books: {
    text: 'Books & Digital Media',
    icon: require('../assets/icons/booksDigitalmedia.png')
  },
  flowers: {
    text: 'Flowers & Gifts',
    icon: require('../assets/icons/flowerGifts.png')
  },
  office: {
    text: 'Office Supplies',
    icon: require('../assets/icons/officeSupply.png')
  }
};

//stateless component
const KategorySearch = ({ kategories, filterByItem }) => {
  const changeKategoryIconColor = text => (kategories.includes(text) ? styles.selected : styles.notSelected);
  const colorTint = text => (kategories.includes(text) ? styles.tint : styles.noTint);
  const tintClearAll = () => (kategories.length == 0 ? styles.tint : styles.noTint);
  return (
    <ScrollView style={styles.iconSearchbar} contentContainerStyle={styles.container} horizontal={true}>
      <View style={styles.categoryIconContainer}>
        <TouchableOpacity
          key={'clear'}
          onPress={() => filterByItem('kategories', 'clear')}
          style={changeKategoryIconColor('clear')}
        >
          <View style={styles.iconContainer}>
            <Image
              style={[tintClearAll(), { resizeMode: 'contain', width: 40, height: 40 }]}
              source={require('../assets/icons/clearFilterIcon.png')}
            />
            <Text style={styles.iconSubText}>All</Text>
          </View>
        </TouchableOpacity>

        {Object.keys(kategoriesList).map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => filterByItem('kategories', category)}
            style={changeKategoryIconColor(category)}
          >
            <View style={styles.iconContainer}>
              <Image
                style={[colorTint(category), { resizeMode: 'contain', width: 40, height: 40 }]}
                source={kategoriesList[category].icon}
              />
              <Text style={styles.iconSubText}>{kategoriesList[category].text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

KategorySearch.propTypes = {
  kategories: array.isRequired,
  filterByItem: func.isRequired
};

export default KategorySearch;
