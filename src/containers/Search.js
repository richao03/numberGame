import React, { Component } from 'react';
import { Image, TextInput, FlatList, Text, View, contentContainerStyle, TouchableOpacity } from 'react-native';
import { shape, func, string, object } from 'prop-types';
import { styles } from './styles/Search';
import Modal from 'react-native-modal';

import SearchModal from '../components/SearchModal';
import LoadingScreen from '../components/LoadingScreen';
import KategorySearch from '../components/KategorySearch';
import ShowSearchDeals from '../components/ShowSearchDeal';

import axios from 'axios';
import { getFromStorage } from '../util';
import { getDealsApi } from '../util/kardApi';

class Search extends Component {
  state = {
    deals: [],
    loading: true,
    filteredDeals: [],
    kategories: [],
    cardsToFilter: [],
    foundNothing: false,
    sortedBy: 'Sort',
    walletModalVisible: false,
    modalView: ''
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

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve));

  async componentDidMount() {
    try {
      const token = await getFromStorage('uToken');
      const response = await getDealsApi(token);
      const deals = response.data.filter(offer => offer.merchant);
      await this.setStateAsync({ loading: false, deals: deals });
    } catch (error) {
      console.log(`Couldn't get Deals`);
    }
  }

  //Search Box related functions
  handleSearchTermChange = text => {
    clearTimeout(this.textTimeout);
    this.textTimeout = setTimeout(() => this.searchText(text), 200);
  };

  searchText = text => {
    this.setState({ foundNothing: false });
    let textInput = text.toLowerCase();
    const filteredDeals = this.state.deals.filter(deal => deal.merchant.name.toLowerCase().match(textInput));
    return filteredDeals.length ? this.setState({ filteredDeals }) : this.setState({ foundNothing: true });
  };

  //kategor related
  filterByItem = (stateName, itemText) => {
    console.log('sup', itemText);
    const newState = {};
    if (itemText == 'clear') {
      this.setState({ kategories: [] });
      return;
    }
    newState[stateName] = this.state[stateName].includes(itemText)
      ? this.state[stateName].filter(item => item !== itemText)
      : [...this.state[stateName], itemText];
    this.setState(newState);
  };

  checkForBarclaysCard = card => (card.match('Barclay') ? 'Kard' : card);

  checkIfCardExists = (stateName, cardName) => {
    cardName = this.checkForBarclaysCard(cardName);
    if (cardName == 'clearAll') {
      setTimeout(() => this.setState({ cardsToFilter: [], walletModalVisible: false }), 400);
    } else {
      this.filterByItem(stateName, cardName);
      setTimeout(() => this.setState({ walletModalVisible: false }), 400);
    }
  };

  cardSelected = bank => {
    return styles.cardContainer;
  };

  setSortedBy = type => {
    this.setState({ sortedBy: type, walletModalVisible: false });
  };

  textOfCardSelected = bank => {
    bank = this.checkForBarclaysCard(bank);
    return this.state.cardsToFilter.includes(bank) ? styles.textOfCardSelected : styles.textOfCardNotSelected;
  };

  toggleSearchModal = modalView =>
    this.setState({ walletModalVisible: !this.state.walletModalVisible, modalView: modalView });

  dynamicSort = property => {
    console.log('sup');
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    if (property == 'offerText') {
      return function(a, b) {
        var result =
          Number(a[property][0]) < Number(b[property][0])
            ? -1
            : Number(a[property][0]) > Number(b[property][0]) ? 1 : 0;
        return result * sortOrder;
      };
    } else {
      return function(a, b) {
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
  };

  render() {
    let imgSrc = this.props.screenProps.user.cards[0].image;
    let cardName = this.props.screenProps.user.cards[0].name;
    let answer;
    let subtext;
    let flatListData = this.state.deals;
    let doubleFilteredData = [];
    const selectModalView = () => (this.state.modalView == 'sortSearch' ? styles.sortModal : styles.cardModal);

    if (this.state.loading) {
      return <LoadingScreen loadDeals />;
    }

    //this secion decides what flatListData is going to be
    if (this.state.filteredDeals.length) {
      flatListData = this.state.filteredDeals;
    }

    //death by nested loop, checking kategories of flat list data
    if (this.state.kategories.length) {
      for (let i = 0; i < this.state.kategories.length; i++) {
        if (flatListData !== undefined && flatListData.length) {
          for (let j = 0; j < flatListData.length; j++) {
            if (flatListData[j].kategory) {
              for (let k = 0; k < flatListData[j].kategory.length; k++) {
                if (flatListData[j].kategory[k].name.match(this.state.kategories[i])) {
                  doubleFilteredData.push(flatListData[j]);
                }
              }
            }
          }
        }
      }
      flatListData = [...new Set(doubleFilteredData.map(merchant => merchant))];
      doubleFilteredData = [];
    }

    if (this.state.cardsToFilter.length > 0) {
      for (let i = 0; i < this.state.cardsToFilter.length; i++) {
        if (flatListData !== undefined && flatListData.length) {
          for (let j = 0; j < flatListData.length; j++) {
            if (this.state.cardsToFilter[i].match(flatListData[j].bank)) {
              doubleFilteredData.push(flatListData[j]);
            }
          }
        }
      }
      flatListData = [...new Set(doubleFilteredData.map(merchant => merchant))];
      doubleFilteredData = [];
    }

    if (this.state.sortedBy == 'Sorted Alphabetically') {
      flatListData = flatListData.sort(this.dynamicSort('merchant_name'));
    }
    if (this.state.sortedBy == 'Sorted by Best Deals') {
      flatListData = flatListData.sort(this.dynamicSort('-offerText'));
    }
    if (this.state.sortedBy == 'Sorted by Most Popular') {
      flatListData = flatListData.sort(this.dynamicSort('-merchant_name'));
    }
    //leave this for now
    // if (this.state.cardsToFilter.length || this.state.kategories.length) {
    //   const data = [...this.state.cardsToFilter, ...this.state.kategories];
    //   const newDataSet = flatListData.filter(offer => {
    //     let newDeal;
    //     data.map(criteria => {
    //       let kategory = '';
    //       if (offer.kategory && offer.kategory.length) {
    //         kategory = JSON.stringify(offer.kategory.map(idx => idx.name).toString());
    //       }
    //       if (`${offer.bank} ${kategory}}`.toLowerCase().indexOf(criteria.toLowerCase()) > -1) {
    //         newDeal = offer;
    //       }
    //     });
    //     return newDeal;
    //   });
    //   console.log(newDataSet.length);
    //   flatListData = [...new Set(newDataSet.map(merchant => merchant))];
    // }

    let kardOffers;
    if (this.state.foundNothing || !flatListData.length) {
      kardOffers = (
        <View style={{ height: 440, alignItems: 'center' }}>
          <Image source={require('../assets/icons/noDealsFound.png')} />
          <Text style={{ color: 'grey' }}>No Deals Found</Text>
          <Text style={{ color: 'grey' }}>Please try a new search</Text>
        </View>
      );
    } else {
      kardOffers = (
        <FlatList
          data={flatListData}
          keyExtractor={item => item._id}
          extraData={this.state}
          removeClippedSubviews={false}
          renderItem={({ item }) => <ShowSearchDeals {...this.props} item={item} imgSrc={imgSrc} cardName={cardName} />}
          initialNumToRender={20}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleSearchTermChange}
            placeholder="   Search for deals"
          />
          <TouchableOpacity style={styles.searchCardIconContainer} onPress={() => this.toggleSearchModal('cardSearch')}>
            <Image style={{ marginRight: 10 }} source={require('../assets/icons/searchCardIcon.png')} />
          </TouchableOpacity>
        </View>
        <KategorySearch kategories={this.state.kategories} filterByItem={this.filterByItem} />
        <View style={styles.sortingBarContainer}>
          <Text style={styles.greyText}>{flatListData.length} Deals Found</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.toggleSearchModal('sortSearch')}
          >
            <Text style={styles.greyText}>{this.state.sortedBy}</Text>
            <Image
              style={{ height: 35, width: 35, resizeMode: 'contain' }}
              source={require('../assets/icons/dropDown.png')}
            />
          </TouchableOpacity>
        </View>
        {kardOffers}
        <Modal
          style={selectModalView()}
          isVisible={this.state.walletModalVisible}
          animationIn="slideInUp"
          backdropColor="black"
          backdropOpacity={0.3}
          animationOut="slideOutDown"
          swipeDirection="down"
          onBackdropPress={() => this.setState({ walletModalVisible: false })}
        >
          <SearchModal
            setSortedBy={this.setSortedBy}
            clickType={this.state.modalView}
            screenProps={this.props.screenProps}
            checkIfCardExists={this.checkIfCardExists}
            cardsToFilter={this.state.cardsToFilter}
            cardSelected={this.cardSelected}
            textOfCardSelected={this.textOfCardSelected}
          />
          <TouchableOpacity
            style={{
              height: 30,
              justifyContent: 'center'
            }}
            onPress={() => this.toggleSearchModal('close')}
          >
            <Text
              style={{
                margin: 10,
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default Search;
