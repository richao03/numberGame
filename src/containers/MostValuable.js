import React, { Component } from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  contentContainerStyle,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import LoadingScreen from '../components/LoadingScreen';
import { getFromStorage } from '../util';
import { getDealsApi } from '../util/kardApi';
import { styles } from './styles/Featured';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';

class MostValuable extends Component {
  state = {
    activeSlide: 0,
    deals: [],
    topDeals: [],
    loading: true,
    bgColor: [
      '#F07170',
      '#FDA071',
      '#FDC453',
      '#8BC94C',
      '#4DDBC3',
      '#4DC4FE',
      '#5D95FF',
      '#B48DFE',
      '#FF4DA5',
      '#8C98A4'
    ]
  };

  async componentDidMount() {
    try {
      const token = await getFromStorage('uToken');
      const response = await getDealsApi(token);
      const Deals = response.data.filter(offer => {
        return offer.merchant.name.match('ard') && offer.bank.match('Kard');
      });
      const featuredDeals = response.data.filter(offer => {
        return offer.merchant.name.match('ard') && offer.bank.match('Kard');
      });
      this.setState({ loading: false, deals: Deals, topDeals: featuredDeals });
    } catch (error) {
      console.log(`Couldn't get Deals`, error);
    }
  }

  randomize(num) {
    var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    return {
      backgroundColor: item,
      width: width - 160,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  featuredDeals = ({ item }) => {
    let dealText;
    let subtext;
    let cardName = this.props.screenProps.user.cards[0].name;
    if (Array.isArray(item.offerText) && item.offerText.length == 2) {
      dealText = item.offerText[0] + ' extra miles';
    } else if (Array.isArray(item.offerText) && item.offerText.length == 1) {
      dealText = item.offerText + ' extra miles/$1';
    }

    let randomColor = this.getTwoRandomColor();

    return (
      <View style={styles.featureContainer} key={item._id}>
        <LinearGradient colors={randomColor} style={styles.LinearGradient}>
          <View style={styles.featuredDealText}>
            <Text>Featured Deals</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              {' '}
              {dealText} at <Text style={{ fontWeight: 'normal' }}>{item.merchant.name}</Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  getTwoRandomColor = () => {
    var rand = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    var rand1 = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    return [rand, rand1];
  };

  kardOffers = ({ item }) => {
    let dealText;
    let subtext;
    let imgSrc;
    let cardName;
    if (item.offerText.length == 2 && item.offerText[0] !== undefined) {
      subtext = 'available ' + item.offerText[0];
      imgSrc = this.props.screenProps.user.cards[0].image;
      cardName = this.props.screenProps.user.cards[0].name;
      dealText = item.offerText[0] + ' extra miles/$1';
    } else {
      imgSrc = this.props.screenProps.user.cards[0].image;
      dealText = item.offerText + '% cash back';
      cardName = this.props.screenProps.user.cards[0].name;
    }

    // if (item.offerText.length == 2) {
    return (
      <View style={styles.dealContainer} key={item._id}>
        <View style={styles.dealLeftContainer}>
          <Image source={require('../assets/icons/Groupon.png')} />
          <Image style={styles.dealLeftCardContainer} source={{ uri: imgSrc }} />
          <Text style={styles.cardName}>{cardName}</Text>
        </View>
        <View style={this.randomize(Math.random())}>
          <View style={styles.dealRightTextContainer}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              {' '}
              {dealText} at <Text style={{ fontWeight: 'normal' }}>{item.merchant.name}</Text>
            </Text>
          </View>
          <View>
            <Text>{subtext}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return <LoadingScreen loadDeals />;
    }
    return (
      <View>
        <View
          onPress={() => {
            this._carousel.triggerRenderingHack();
          }}
        >
          <Carousel
            layout={'default'}
            horizontal={true}
            data={this.state.topDeals}
            keyExtractor={item => item._id}
            renderItem={this.featuredDeals}
            itemHeight={150}
            itemWidth={width - 50}
            sliderWidth={width}
            removeClippedSubviews={false}
            autoplay={true}
            autoplayInterval={5000}
            autoplayDelay={4000}
            ref={c => {
              this._carousel = c;
            }}
          />
        </View>

        <FlatList
          data={this.state.deals}
          keyExtractor={item => item._id}
          renderItem={this.kardOffers}
          contentContainerStyle={{ flexGrow: 1 }}
          initialNumToRender={10}
        />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

export default MostValuable;
