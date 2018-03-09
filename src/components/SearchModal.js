import React, { Component } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  contentContainerStyle,
  Image,
  TouchableOpacity
} from 'react-native';
import { truncate } from '../util';

class SearchModal extends Component {
  //need stock image for credit cards without images
  userCards = card => {
    if (card.image) {
      return (
        <TouchableOpacity
          key={card._id}
          onPress={() => {
            this.props.checkIfCardExists('cardsToFilter', card.bank);
          }}
          style={this.props.cardSelected(card.bank)}
        >
          <View style={styles.filterCardContainer}>
            <Image
              style={{ width: 50, height: 27, marginLeft: 20, marginRight: 20, borderRadius: 3 }}
              source={{ uri: card.image }}
            />
            <Text style={this.props.textOfCardSelected(card.bank)}>{truncate(card.name)}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    if (this.props.clickType == 'cardSearch') {
      return (
        <View style={styles.alreadyAddedContainer}>
          <View
            style={[
              styles.filterCardContainer,
              {
                marginTop: -10,
                alignItems: 'center',
                height: 40,
                width: width,
                backgroundColor: 'white'
              }
            ]}
          >
            <Text style={[styles.cardFilterHeader, { marginLeft: 25 }]}>FILTER BY CARD</Text>
          </View>
          <ScrollView>
            <TouchableOpacity
              style={{ marginBottom: 5, marginLeft: 10 }}
              onPress={() => {
                this.props.checkIfCardExists('cardsToFilter', 'clearAll');
              }}
            >
              <View style={[styles.filterCardContainer]}>
                <Image
                  style={{
                    resizeMode: 'contain',
                    width: 50,
                    height: 27,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 3,
                    marginBottom: 10
                  }}
                  source={require('../assets/icons/clearCardFilterIcon.png')}
                />
                <Text>All Cards</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.box}>{this.props.screenProps.user.cards.map(card => this.userCards(card))}</View>
          </ScrollView>
        </View>
      );
    } else if (this.props.clickType == 'sortSearch') {
      return (
        <View style={styles.alreadyAddedContainer}>
          <View
            style={[
              styles.filterCardContainer,
              {
                marginTop: -10,
                alignItems: 'center',
                height: 40,
                width: width,
                backgroundColor: 'white'
              }
            ]}
          >
            <Text style={[styles.cardFilterHeader, { marginLeft: 25 }]}>SORT BY</Text>
          </View>
          <ScrollView>
  
            <TouchableOpacity
              onPress={() => {
                this.props.setSortedBy('Sorted Alphabetically');
              }}
              style={this.props.cardSelected()}
            >
              <Text>Alphabetical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.setSortedBy('Sorted by Best Deals');
              }}
              style={this.props.cardSelected()}
            >
              <Text>Best Deals</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  alreadyAddedContainer: {
    width: width,
    height: 230
  },
  sortDealsContainer: {
    width: width,
    height: height / 3,
    borderWidth: 2
  },
  filterCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  cardFilterHeader: {
    height: 20,
    margin: 10,
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
    justifyContent: 'center'
  }
});

export default SearchModal;
