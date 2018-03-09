import React, { Component } from 'react';
import axios from 'axios';
import {
  WebView,
  FlatList,
  Text,
  View,
  Modal,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  contentContainerStyle
} from 'react-native';
import LoadingScreen from '../components/LoadingScreen';
import { getFromStorage } from '../util';
import { shape, func } from 'prop-types';
import { styles } from './styles/WebView';
import LinearGradient from 'react-native-linear-gradient';

class WebViewNavigator extends Component {
  state = {
    showModal: true
  };
  static propTypes = {
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  };

  componentDidMount() {
    setTimeout(() => this.closeModal(), 3300);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let answer;
    if (this.props.navigation.state.params.shortLink[0].toString().length > 1) {
      answer = this.props.navigation.state.params.shortLink[0].toString();
    } else {
      answer = this.props.navigation.state.params.shortLink;
    }

    return (
      <View style={styles.container}>
        <View style={styles.webViewHeader}>
          <TouchableOpacity style={styles.webViewBackButton} onPress={() => this.props.navigation.goBack(null)}>
            <View>
              <Image style={{marginLeft:10}}source={require('../assets/icons/arrowleftwhite.png')} />
            </View>
          </TouchableOpacity>
          <View style={styles.webViewTopTextContainer}>
            <Text style={{ color: 'white', fontSize: 20 }}>{this.props.navigation.state.params.offer}</Text>
            <Text style={{ color: 'grey', fontWeight: '100' }}>at {this.props.navigation.state.params.merchant} </Text>
          </View>
          <View>
            <Image style={styles.webViewTopCardIcon} source={{ uri: this.props.navigation.state.params.cardIcon }} />
          </View>
        </View>
        <WebView source={{ url: answer }} />
        <Modal
          transparent={true}
          visible={this.state.showModal}
          animationType={'fade'}
          onRequestClose={() => this.toggleModal()}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.closeModal();
            }}
          >
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.topTextContainer}>
                    <Image
                      style={[styles.modalIcon, { width: 100, resizeMode: 'contain' }]}
                      source={require('../assets/icons/modalCheck.png')}
                    />
                  </View>
                  <View style={styles.middleContainer}>
                    <Text style={[styles.middleContanerText, { color: 'black' }]}>Deal Activated!</Text>
                    <View style={{ height: 10 }} />
                    <Text style={[styles.middleContanerText, { color: '#04C897' }]}>
                      {this.props.navigation.state.params.offer}
                    </Text>
                  </View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.bottomCardContainer}>
                      <Image style={styles.cardIcon} source={{ uri: this.props.navigation.state.params.cardIcon }} />
                      <Text style={styles.cardName}>{this.props.navigation.state.params.cardName}</Text>
                    </View>
                    <View style={styles.bottomLogoContainer}>
                      <Image
                        style={styles.merchantLogo}
                        resizeMode="contain"
                        source={this.props.navigation.state.params.merchantLogo}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

export default WebViewNavigator;
