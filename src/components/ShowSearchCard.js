import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { shape, string, func, array } from 'prop-types';
import { styles } from './styles/ShowSearchCard';
import { truncate } from '../util';

const addButton = require('../assets/icons/plusIcon.png');
const greyCheck = require('../assets/icons/greyCheck.png');

class ShowSearchCard extends Component {
  state = {
    disabled: false
  };

  componentWillMount() {
    return this.checkForAddedCards(this.props, this.props.card.name) && this.setState({ disabled: true });
  }

  componentWillReceiveProps(nextProps) {
    return this.checkForAddedCards(nextProps, nextProps.card.name)
      ? this.setState({ disabled: true })
      : this.setState({ disabled: false });
  }

  checkForAddedCards = props => props.cardsAdded.map(card => card.name).includes(props.card.name);

  renderIcon = cardName => {
    const userHasThisCard = this.checkForAddedCards(this.props, cardName);
    const imgSource = this.state.disabled || userHasThisCard ? greyCheck : addButton;
    return <Image source={imgSource} />;
  };

  renderTextColor = cardName => {
    const userHasThisCard = this.checkForAddedCards(this.props, cardName);
    const textSource = this.state.disabled || userHasThisCard ? styles.cardTextGrey : styles.cardTextBlack;
    return <Text style={textSource}>{truncate(cardName)}</Text>;
  };

  render() {
    const { card, addCard } = this.props;
    return (
      <View key={card._id} style={styles.cardContainer}>
        <Image style={styles.cardImage} source={{ uri: card.image }} />
        {this.renderTextColor(card.name)}
        <TouchableOpacity
          onPress={() => {
            addCard(card);
            this.setState({ disabled: true });
          }}
          disabled={this.state.disabled}
        >
          {this.renderIcon(card.name)}
        </TouchableOpacity>
      </View>
    );
  }
}

ShowSearchCard.propTypes = {
  card: shape({
    image: string.isRequired,
    name: string.isRequired
  }).isRequired,
  addCard: func.isRequired,
  cardsAdded: array.isRequired
};

export default ShowSearchCard;
