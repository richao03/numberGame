import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import axios from 'axios';
import { styles } from './styles/ActivityFeed';

class ActivityFeed extends Component {
  state = {
    feedData: [
      {
        name: 'Ana',
        time: '5',
        activationCount: 0,
        offer: 10,
        merchant: 'Amazon',
        merchantIcon: require('../assets/icons/Amazon.png')
      },
      {
        name: 'Ben',
        time: '20',
        activationCount: 3,
        offer: 5,
        merchant: 'Samsung',
        merchantIcon: require('../assets/icons/Samsung.png')
      },
      {
        name: 'Charlie',
        time: '33',
        activationCount: 5,
        offer: 15,
        merchant: 'Walmart',
        merchantIcon: require('../assets/icons/Walmart.png')
      },
      {
        name: 'Daniel',
        time: '42',
        activationCount: 6,
        offer: 5,
        merchant: 'Target',
        merchantIcon: require('../assets/icons/Target.png')
      },
      {
        name: 'Edgar',
        time: '50',
        activationCount: 4,
        offer: 12,
        merchant: 'Macy',
        merchantIcon: require('../assets/icons/Macy.png')
      },
      {
        name: 'Frank',
        time: '55',
        activationCount: 10,
        offer: 3,
        merchant: 'Groupon',
        merchantIcon: require('../assets/icons/Groupon.png')
      },
      {
        name: 'Gary',
        time: '70',
        activationCount: 0,
        offer: 10,
        merchant: 'Amazon',
        merchantIcon: require('../assets/icons/Amazon.png')
      },
      {
        name: 'Harold',
        time: '20',
        activationCount: 3,
        offer: 5,
        merchant: 'Samsung',
        merchantIcon: require('../assets/icons/Samsung.png')
      },
      {
        name: 'Ian',
        time: '33',
        activationCount: 5,
        offer: 12,
        merchant: 'Walmart',
        merchantIcon: require('../assets/icons/Walmart.png')
      },
      {
        name: 'Jack',
        time: '42',
        activationCount: 6,
        offer: 5,
        merchant: 'Target',
        merchantIcon: require('../assets/icons/Target.png')
      },
      {
        name: 'Kyle',
        time: '50',
        activationCount: 4,
        offer: 15,
        merchant: 'Macy',
        merchantIcon: require('../assets/icons/Macy.png')
      },
      {
        name: 'Larry',
        time: '55',
        activationCount: 10,
        offer: 3,
        merchant: 'Groupon',
        merchantIcon: require('../assets/icons/Groupon.png')
      }
    ]
  };

  async componentDidMount() {}

  createFeed = ({ item }) => {
    let iconSrc = item.merchantIcon;
    return (
      <View style={styles.container}>
        <View key={item.name} style={styles.eachFeedContainer}>
          <View style={styles.feedTopBar}>
            <Text style={styles.feedTopBarLeft}>
              {item.name} activated {item.time} mins ago
            </Text>
            <Text style={styles.feedTopBarRight}>{item.activationCount} Activations</Text>
          </View>
          <View style={styles.feedBottomBar}>
            <Text style={styles.feedBottomLeft}>Extra {item.offer} points / $1</Text>
            <Image style={styles.feedBottomRight} source={iconSrc} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (<View style={{backgroundColor:"white"}}> 
      <FlatList data={this.state.feedData} keyExtractor={item => item.name} renderItem={this.createFeed} />
    </View>);
  }
}

export default ActivityFeed;
