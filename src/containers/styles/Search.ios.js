import { StyleSheet, Dimensions } from 'react-native';

const opacityExpression = 0.3;
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEBED',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar: {
    width: width,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0583DC',
    display: 'flex',
    flexDirection: 'row'
  },
  textInput: {
    marginTop: 5,
    height: 35,
    width: width - 75,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  iconSearchbar: {
    height: 100,
    margin: 10
  },
  iconSubText: {
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardModal: {
    marginTop: height * 0.6,
    height: 180,
    margin: 0,
    width: width,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  sortModal:{
    marginTop: height * 0.8,
    height: 180,
    margin: 0,
    width: width,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  cardContainer: {
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#EAEBED',
    justifyContent: 'center'
  },
  searchCardIconContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    marginRight: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sortingBarContainer: {
    width: width - 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  },
  greyText: { color: 'grey' },
  textOfCardSelected: {
    color: '#0583DC'
  },
  textOfCardNotSelected: {
    color: 'black'
  }
});
