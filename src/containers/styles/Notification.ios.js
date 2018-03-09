import { StyleSheet } from 'react-native';

const $blue = '#0583DC';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff'
  },
  mainTextContainer: {
    flex: 2.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 30,
    paddingBottom: 15,
    color: $blue,
    textAlign: 'center'
  },
  subText: {
    fontSize: 17,
    textAlign: 'center',
    color: '#92A2B0'
  },
  imageContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  firstImage: {
    marginTop: 60,
    height: 212,
    width: 220
  },
  secondImage: {
    height: 210,
    width: 180,
    marginTop: 20
  },
  thirdImage: {
    marginTop: 20,
    height: 250,
    width: 110
  }
});
