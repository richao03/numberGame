import React, { Component } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  defaultSource,
  KeyboardAvoidingView,
  onSubmitEditing
} from 'react-native';
import { object, shape, func, string } from 'prop-types';
import t from 'tcomb-form-native';
import axios from 'axios';
import ShowSearchCard from '../components/ShowSearchCard';
import ShowUserWallet from '../components/ShowUserWallet';
import { getFromStorage, truncate } from '../util';
import { updateUserApi, searchCardApi } from '../util/kardApi';
import { searchCardOption } from '../util/form';
import { styles } from './styles/Wallet';

const Form = t.form.Form;

const cardToSearch = t.struct({
  searchCards: t.String
});

const searchCardOptions = fn => ({
  auto: 'none',
  fields: {
    searchCards: searchCardOption(fn)
  }
});

const defaultCard = require('../assets/images/defaultcard-image.png');
const nextIcon = require('../assets/icons/whiteNext.png');
const searchIcon = require('../assets/icons/magnifyingGlassIcon.png');

const listOfBanks = {
  chase: require('../assets/icons/chase.png'),
  citi: require('../assets/icons/citiBank.png'),
  capitalone: require('../assets/icons/capitalOne.png'),
  bankofamerica: require('../assets/icons/bankOfAmerica.png'),
  creditUnion: require('../assets/icons/creditUnion.png'),
  goldmansachs: require('../assets/icons/goldmanSachs.png'),
  wellsfargo: require('../assets/icons/wellsFargo.png'),
  usaa: require('../assets/icons/usaa.png'),
  bankofthewest: require('../assets/icons/bankOfTheWest.png')
};

class Wallet extends Component {
  state = {
    searchValue: {},
    bankList: {},
    showCards: [],
    cardsAdded: [],
    enableButton: false
  };

  static propTypes = {
    screenProps: shape({
      user: object.isRequired,
      _csrf: string.isRequired,
      setAppState: func.isRequired
    }).isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  componentWillMount() {
    const { user } = this.props.screenProps;
    return user && user.cards.length
      ? this.setState({ bankList: listOfBanks, cardsAdded: user.cards })
      : this.setState({ bankList: listOfBanks, cardsAdded: [] });
  }

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve));

  updateUser = async cardObj => {
    try {
      const response = await updateUserApi(cardObj, this.props.screenProps._csrf);
      await this.props.screenProps.setAppState({
        user: response.data.user
      });
      await this.setStateAsync({ cardsAdded: this.props.screenProps.user.cards, enableButton: true });
    } catch (error) {}
  };

  addCard = card => this.updateUser({ cards: [card] });

  removeCard = userCardName => {
    const removeCard = this.state.cardsAdded
      .filter(card => card.name === userCardName)
      .map(card => card._id.toString());
    this.updateUser({ remove: removeCard });
  };

  searchCard = async value => {
    try {
      const response = await searchCardApi(value['searchCards']);
      //figure out how to do default image
      const cards = response.data.filter(card => card.bank && card.image);
      await this.setStateAsync({ showCards: cards, searchValue: null, bankList: {} });
      Keyboard.dismiss();
    } catch (error) {
      //make a function to display error handling msgs
      const { status } = error.response;
      console.log('this is an error', error);
    }
  };

  onSubmit = () => {
    const error = this.refs.form.validate().errors;
    const value = this.refs.form.getValue();
    return !error.length && value && this.searchCard(value);
  };

  handleSearchTermChange = value => {
    clearTimeout(this.textTimeout);
    this.textTimeout = value => setTimeout(() => this.setState({ value }), 200);
  };
  //this should be reuseable component
  buttonToShow = () => {
    const buttonColor = this.state.enableButton ? styles.greenButton : styles.greyButton;
    return (
      <TouchableHighlight
        style={buttonColor}
        onPress={() => this.props.screenProps.setAppState({ onboarding: false })}
        disabled={!this.state.enableButton}
      >
        <View style={styles.buttonContent}>
          <View style={styles.invisible} />
          <Text style={styles.buttonText}>NEXT</Text>
          <View style={styles.iconContainer}>
            <Image style={styles.nextIcon} source={nextIcon} />
          </View>
        </View>
      </TouchableHighlight>
    );
  };
//make this a container and component
  showUserWalletCards = () => {
    let userCards;
    if (this.state.cardsAdded.length) {
      userCards = (
        <View style={styles.userCardContainer}>
          <ScrollView contentContainerStyle={styles.userCardContent} horizontal={true}>
            {this.state.cardsAdded.map(card => (
              <ShowUserWallet key={card._id} card={card} removeCard={this.removeCard} />
            ))}
          </ScrollView>
        </View>
      );
    } else {
      userCards = <View />;
    }
    return userCards;
  };

  showBankNameText = bankName => {
    this.setState({ searchValue: { searchCards: bankName } });
    this.refs.form.getComponent('searchCards').refs.input.focus();
  };

  //turn this in to component
  showBankIconsOrCards = () => {
    if (this.state.showCards.length) {
      return (
        <View style={styles.userCardContainer}>
          <ScrollView>
            {this.state.showCards.map(card => (
              <ShowSearchCard key={card._id} card={card} addCard={this.addCard} cardsAdded={this.state.cardsAdded} />
            ))}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.bankListContainer}>
          {Object.keys(this.state.bankList).map(name => (
            <TouchableOpacity key={name} style={styles.bankIconButton} onPress={() => this.showBankNameText(name)}>
              <Image style={styles.bankIconImg} source={this.state.bankList[name]} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  backBtn = () => {
    return (
      <View style={styles.backButton}>
        <Text style={styles.backButtonText} onPress={() => this.props.navigation.goBack(null)}>
          BACK
        </Text>
      </View>
    );
  };

  render() {
    //this needs to be a component inputbox
    const { params } = this.props.navigation.state;
    let displayBackButton;
    let displayNextButton;
    if (params && params.parentView === 'myaccount') {
      displayBackButton = this.backBtn();
      displayNextButton = <View />;
    } else {
      displayBackButton = <View />;
      displayNextButton = this.buttonToShow();
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchIconContainer}>
            <Image style={styles.searchIconImg} source={searchIcon} />
          </View>
          <View style={styles.searchCardInput}>
            <Form
              ref="form"
              type={cardToSearch}
              options={searchCardOptions(this.onSubmit)}
              value={this.state.searchValue}
              onChange={this.handleSearchTermChange}
              autoFocus
            />
          </View>
          {displayBackButton}
        </View>
        {this.showUserWalletCards()}
        <View style={styles.viewCards}>{this.showBankIconsOrCards()}</View>
        <KeyboardAvoidingView style={styles.buttonContainer} behavior="position" keyboardVerticalOffset={0}>
          {displayNextButton}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Wallet;
