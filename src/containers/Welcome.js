import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import ButtonFooter from '../components/ButtonFooter';
import { styles } from './styles/Welcome';

const firstImage = require('../assets/images/welcome-image.png');
const secondImage = require('../assets/images/welcome-image2.png');
const thirdImage = require('../assets/images/welcome-image3.png');

const Welcome = props => {
  return (
    <View style={styles.container}>
      <Swiper showsButtons={true}>
        <View style={styles.slide1}>
          <Text>Welcome Slide 1</Text>
          <Image style={styles.image1} source={firstImage} />
        </View>
        <View style={styles.slide2}>
          <Text>Welcome Slide 2</Text>
          <Image style={styles.image1} source={secondImage} />
        </View>
        <View style={styles.slide3}>
          <Text>Welcome Slide 3</Text>
          <Image style={styles.image1} source={thirdImage} />
        </View>
        <View style={styles.slide4}>
          <Text>KARD!!</Text>
        </View>
      </Swiper>
      <ButtonFooter view={props.navigation.state} {...props} />
    </View>
  );
};

export default Welcome;
