import React, { Component } from 'react';
import { Alert, Text, View, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { shape, func } from 'prop-types';
import { styles } from './styles/Notification';
import ButtonFooter from '../components/ButtonFooter';
// import AddCreditCardBtn from '../components/AddCreditCardBtn';

const firstPage = {
  mainText: `We'll keep you posted on the deals`,
  subText: `Allow notifications and get alerted about new deals`,
  btnText: `LATER`,
  image: require('../assets/images/notification-image1.png')
};

const secondPage = {
  mainText: `Don't miss out!`,
  subText: `We'll only send you the best deals`,
  btnText: `SKIP`,
  image: require('../assets/images/notification-image2.png')
};

const thirdPage = {
  mainText: `Add your credit cards`,
  subText: `We use your credit card information to identify the best deals for you`,
  btnText: `Add Credit Cards`,
  image: require('../assets/images/addcreditcard-image.png')
};

class Notification extends Component {
  state = firstPage;

  // static propTypes = {
  //   navigation: shape({
  //     navigate: func.isRequired
  //   }).isRequired
  // };

  verifyNotification = () => {
    Alert.alert(
      'KARD Would Like to Send You Notifications',
      'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
      [
        {
          text: "Don't Allow",
          onPress: () => {
            // this.props.navigation.navigate('Wallet');
            this.setState(thirdPage);
          }
        },
        {
          text: 'OK',
          onPress: () => {
            // this.props.navigation.navigate('Wallet');
            this.setState(thirdPage);
          }
        }
      ]
    );
  };

  switchTextorState = () => (this.state.btnText === 'LATER' ? this.setState(secondPage) : this.setState(thirdPage));

  renderImage = () => {
    let showImage = firstPage.image;
    let styleImage = styles.firstImage;
    if (this.state.btnText === 'SKIP') {
      showImage = secondPage.image;
      styleImage = styles.secondImage;
    }
    if (this.state.btnText === 'Add Credit Cards') {
      styleImage = styles.thirdImage;
      showImage = thirdPage.image;
    }
    return <Image style={styleImage} source={showImage} />;
  };

  passCurrentStateName = () => {
    const viewProp = {
      routeName: 'AddCreditCard'
    };
    return this.state.btnText === 'Add Credit Cards' ? viewProp : this.props.navigation.state;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.title}>{this.state.mainText}</Text>
          <Text style={styles.subText}>{this.state.subText}</Text>
        </View>
        <View style={styles.imageContainer}>{this.renderImage()}</View>
        <ButtonFooter
          view={this.passCurrentStateName()}
          verifyNotification={this.verifyNotification}
          switchTextorState={this.switchTextorState}
          btnText={this.state.btnText}
          {...this.props}
        />
      </View>
    );
  }
}

export default Notification;
