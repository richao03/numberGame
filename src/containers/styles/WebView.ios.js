import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width
  },
  modalContent: {
    display: 'flex',
    height: 250,
    width: 250,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5
  },
  modalIcon: {
    alignSelf: 'center'
  },
  topTextContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height:0,
  },
  middleContainer: {
    flex: 3,
    width: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"center",
  },
  middleContanerText: {
    color: '#0583DC',
    fontSize: 20
  },
  modalTextBox: {
    width: 250,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    display: 'flex',
    height: height,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  bottomContainer: {
    width: 250,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 5
  },
  bottomCardContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardIcon: {
    height: 30,
    width: 50,
    margin: 3
  },
  webViewTopCardIcon: {
    height: 25,
    width: 38,
    margin: 3,
    marginRight: 10
  },
  cardName: {
    width: 70,
    fontSize: 8,
    color: 'gray',
    justifyContent: 'center',
    textAlign: 'center'
  },
  merchantLogo: {
    alignSelf: 'center',
    maxWidth: 100
  },
  webViewHeader: {
    width: width,
    height: 65,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0583DC',
    display: 'flex',
    flexDirection: 'row'
  },
  webViewTopTextContainer: {
    alignItems: 'center'
  }
});
