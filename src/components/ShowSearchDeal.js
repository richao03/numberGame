import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { shape, string, func } from 'prop-types';
import { styles } from './styles/ShowSearchDeal';

// renderEachDeal = ({ item }) => {
const ShowSearchDeals = ({ item, navigation, imgSrc, cardName }) => {
  let dealText;
  let subtext;
  let cleanShortLink = link => {
    link = link.toString();
    return link.match(/(?<=www\.)([A-Z]*.*)/gim);
  };
  // let merchantLogo = 'https://logo.clearbit.com/' + cleanShortLink(item.offers[0]['shortLink']);

  //if offerText contains limiter (ie: daily, weekly, monthly) then form the string here
  if (item.offerText[1] !== '%') {
    dealText = item.offerText[0] + ' extra miles';
    subtext = 'available ' + item.offerText[1];
  } else {
    dealText = item.offerText[0] + ' extra miles/$1';
    subtext = '';
  }
  return (
    <View key={item._id} style={styles.eachDeal}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WebView', {
            shortLink: item.offers[0]['shortLink'],
            merchant: item.merchant_name,
            offer: dealText,
            cardIcon: imgSrc,
            cardName: cardName
            // merchantLogo: merchantLogo
          });
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.offerText}>{dealText}</Text>
            <View style={styles.float}>
              <Image
                style={{ height: 55, width: 90, resizeMode: 'contain' }}
                source={require('../assets/icons/Amazon.png')}
              />
              <Text style={{marginTop:-10, marginBottom:5, fontSize:10}}>{item.merchant_name}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{
                height: 30,
                width: 50,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginRight: 20,
                marginTop: 10
              }}
              source={{ uri: imgSrc }}
            />
            <Text
              style={{
                height: 30,
                marginRight: 20,
                width: 80,
                fontSize: 8,
                color: 'gray',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              {cardName}
            </Text>
          </View>
        </View>
        <View style={styles.subTextContainer}>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShowSearchDeals;
