import React, { Component } from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  contentContainerStyle,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import LoadingScreen from '../components/LoadingScreen';
import { getFromStorage } from '../util';
import { getDealsApi } from '../util/kardApi';
import { giveFeatured, giveTopDeals } from '../util/featuredDeals';
import { styles } from './styles/Featured';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';

class Featured extends Component {
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

  componentDidMount() {
    const Deals = giveFeatured();
    const topDeals = giveTopDeals();
    this.setState({ loading: false, deals: Deals, topDeals: topDeals });
  }

  randomize(num) {
    const item = this.state.bgColor[num];
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
    let imgSrc = this.props.screenProps.user.cards[0].image;
    if (Array.isArray(item.offerText) && item.offerText.length == 2) {
      dealText = item.offerText[0] + ' Extra Miles';
    } else if (Array.isArray(item.offerText) && item.offerText.length == 1) {
      dealText = item.offerText + ' Extra Miles/$1';
    }
    return (
      <View style={styles.featureContainer} key={item._id}>
        <View style={styles.LinearGradient}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('FeaturedWebView', {
                shortLink: item.offers[0]['shortLink'],
                merchant: item.merchant_name,
                offer: dealText,
                cardIcon: imgSrc,
                cardName: cardName,
                merchantLogo: item.icon
              });
            }}
          >
            <View style={styles.featuredDealText}>
              <Image style={styles.featureTopBar} source={item.banner} />
              <View style={styles.featuredBottomBar}>
                <Text
                  style={{
                    color: '#04C897',
                    fontSize: 18,
                    // fontWeight: 'bold',
                    textAlign: 'center',
                    flex: 1,
                    marginTop: 5
                  }}
                >
                  {' '}
                  {dealText}
                </Text>
                <View style={styles.featuredBottomLogoIcon}>
                  <Image style={{ width: 125, height: 30, resizeMode: 'contain', flex: 2 }} source={item.icon} />
                  <View style={{ flex: 2 }} />
                  <Image style={{ width: 50, height: 20, resizeMode: 'contain' }} source={{ uri: imgSrc }} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getTwoRandomColor = () => {
    const rand = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    const rand1 = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
    return [rand, rand1];
  };

  kardOffers = ({ item }) => {
    let dealText;
    let subtext;
    let imgSrc = this.props.screenProps.user.cards[0].image;
    let cardName = this.props.screenProps.user.cards[0].name;

    if (item.offerText.length == 2 && item.offerText[1] !== undefined) {
      subtext = 'available ' + item.offerText[1];
      dealText = item.offerText[0] + ' Extra Miles/$1';
    } else {
      dealText = item.offerText + '% cash back';
      if (this.props.screenProps.user.cards.length > 1) {
        cardName = this.props.screenProps.user.cards[1].name;
        imgSrc = this.props.screenProps.user.cards[1].image;
      }
    }

    // if (item.offerText.length == 2) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('FeaturedWebView', {
            shortLink: item.offers[0]['shortLink'],
            merchant: item.merchant_name,
            offer: dealText,
            cardIcon: imgSrc,
            cardName: cardName,
            merchantLogo: item.icon
          });
        }}
      >
        <View style={styles.dealContainer} key={item._id}>
          <View style={this.randomize(item.merchant_name.length)}>
            <View style={styles.dealRightTextContainer}>
              <Text style={{ color: 'white', fontSize: 21, textAlign: 'center' }}> {dealText}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 8, textAlign: 'center', color: 'white' }}>{subtext}</Text>
            </View>
          </View>
          <View style={styles.dealLeftContainer}>
            <View style={styles.merchantIcon}>
              <Image style={styles.icon} source={item.icon} />
            </View>
            <Image style={styles.dealLeftCardContainer} source={{ uri: imgSrc }} />
            <Text style={styles.cardName}>{cardName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  get pagination() {
    const { topDeals, activeSlide } = this.state;
    return (
      <View>
        <Pagination
          dotsLength={topDeals.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: 'transparent',
            paddingVertical: 5
          }}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            backgroundColor: '#0583DC'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._carousel}
        />
      </View>
    );
  }

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
            onSnapToItem={index => this.setState({ activeSlide: index })}
            itemHeight={150}
            itemWidth={width - 50}
            removeClippedSubviews={false}
            sliderWidth={width}
            autoplay={true}
            autoplayInterval={5000}
            autoplayDelay={4000}
            ref={c => {
              this._carousel = c;
            }}
          />
          {this.pagination}
        </View>
        <View style={styles.featuredDealsBottomContainer}>
          <FlatList
            data={this.state.deals}
            keyExtractor={item => item._id}
            renderItem={this.kardOffers}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

export default Featured;
