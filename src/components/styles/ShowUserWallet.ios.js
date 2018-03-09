import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 'auto',
    marginLeft: 15
  },
  userCardContent: {
    marginTop: 19,
    backgroundColor: 'white',
    height: 50,
    width: 85
  },
  userCardImage: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 3,
    width: undefined,
    height: undefined
  },
  userCardText: {
    fontSize: 10,
    textAlign: 'center',
    width: 90,
    marginTop: 4
  },
  deleteButtonContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    left: 75,
    top: -10
  },
  deleteButton: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});
