import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  eachFeedContainer: {
    backgroundColor: 'white',
    width: width - 50,
    height: 85,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  feedTopBar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20
  },
  feedTopBarRight: {
    color: '#92A2B0',
    fontSize: 12
  },
  feedTopBarLeft: {
    color: '#92A2B0'
  },
  feedBottomBar: {
    display: 'flex',
    flex: 1,
    height: 100,
    width: width - 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  feedBottomLeft: {
    color: '#0583DC',
    fontSize: 20
  },
  feedBottomRight: {
    height: 45,
    width: 100,
    resizeMode: 'contain'
  }
});
