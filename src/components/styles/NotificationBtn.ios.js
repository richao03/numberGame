import { StyleSheet } from 'react-native';

const $blue = '#0583DC';

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  },
  button: {
    height: 40,
    width: 160,
    backgroundColor: $blue,
    borderColor: $blue,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  buttonRight: {
    height: 40,
    width: 160,
    backgroundColor: 'white',
    borderColor: $blue,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRightText: {
    fontSize: 18,
    color: $blue
  }
});
