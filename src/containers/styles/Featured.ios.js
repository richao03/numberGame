import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  dealContainer: {
    flex: 1,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5
  },
  featureContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.25
  },
  featuredDealsBottomContainer: {
    height: height * 0.53
  },
  merchantIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 90,
    height: 55,
    resizeMode: 'contain'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 35
  },
  tabText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dealLeftContainer: {
    width: 140,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dealRightContainer: {
    width: width - 160
  },
  dealRightTextContainer: {
    width: width - 180,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  dealLeftCardContainer: {
    height: 30,
    width: 50
  },
  cardName: {
    width: 80,
    fontSize: 8,
    color: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  featuredDealText: {
    width: 240,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  LinearGradient: {
    backgroundColor: 'white',
    marginTop: 5,
    height: 150,
    width: width - 50,
    flexDirection: 'column',
    alignItems: 'center'
  },
  featureTopBar: {
    height: 75,
    width: width - 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  featuredBottomBar: {
    height: 75,
    width: width - 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  featuredBottomLogoIcon: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});
