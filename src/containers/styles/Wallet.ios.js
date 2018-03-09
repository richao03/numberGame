import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#5bb58E',
    height: 72
  },
  searchIconContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    height: 36,
    width: 27,
    position: 'absolute',
    marginTop: 31,
    left: 7,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIconImg: {
    height: 15,
    width: 15
  },
  searchCardInput: {
    flex: 8,
    paddingTop: 31,
    paddingLeft: 3
  },
  backButton: {
    flex: 1.8,
    paddingTop: 22,
    justifyContent: 'center'
  },
  backButtonText: {
    justifyContent: 'center',
    textAlign: 'auto',
    fontSize: 20,
    color: 'white'
  },
  userCardContainer: {
    flex: 1.4,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  userCardContent: {
    alignItems: 'center'
  },
  viewCards: {
    flex: 6,
    marginTop: 5,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginTop: 'auto'
  },
  greenButton: {
    height: 50,
    backgroundColor: '#0583DC',
    borderColor: '#0583DC',
    borderWidth: 1
  },
  greyButton: {
    height: 50,
    backgroundColor: '#D5D5D5',
    borderColor: '#D5D5D5',
    borderWidth: 1
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  invisible: {
    flex: 1
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  nextIcon: {
    alignSelf: 'center'
  },
  bankListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 7,
    marginBottom: 'auto',
    marginLeft: 25,
    marginRight: 25
  },
  bankIconButton: {
    justifyContent: 'center',
    height: 95,
    width: 95,
    marginTop: 20
  },
  bankIconImg: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});
