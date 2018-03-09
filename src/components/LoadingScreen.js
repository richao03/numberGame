import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles/LoadingScreen';

const LoadingScreen = props => {
  const displayMsg = props.loadDeals ? 'LOADING DEALS!!!!!..' : '';
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icons/kard-circle-white.png')} />
      <Text>{displayMsg}</Text>
    </View>
  );
};

export default LoadingScreen;
