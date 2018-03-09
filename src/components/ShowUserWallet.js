import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { string, func, shape } from 'prop-types';
import { styles } from './styles/ShowUserWallet';
import { truncate } from '../util';

const ShowUserWallet = ({ card, removeCard }) => (
  <View style={styles.container}>
    <View style={styles.userCardContent}>
      <Image style={styles.userCardImage} source={{ uri: card.image }} />
      <TouchableOpacity style={styles.deleteButtonContainer} onPress={() => removeCard(card.name)}>
        <Image style={styles.deleteButton} source={require('../assets/icons/redx.png')} />
      </TouchableOpacity>
    </View>
    <Text style={styles.userCardText}>{truncate(card.name)}</Text>
  </View>
);

ShowUserWallet.propTypes = {
  card: shape({
    name: string.isRequired,
    image: string.isRequired
  }).isRequired,
  removeCard: func.isRequired
};

export default ShowUserWallet;
