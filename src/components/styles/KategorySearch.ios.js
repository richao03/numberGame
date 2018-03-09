import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSearchbar: {
    backgroundColor: 'white',
    height: 100,
    width: width,
    marginTop: -5
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSubText: {
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryIconContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row'
  },
  notSelected: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  selected: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  tint: {
    tintColor: '#0583DC'
  },
  noTint: {
    tintColor: 'grey'
  }
});
