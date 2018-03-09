import { StyleSheet, Dimensions } from 'react-native';

 const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: height
  },
  settingButtons: {
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: width - 30,
    justifyContent: 'center',
    height: 70
  },
  verionText: {
    alignItems: 'flex-start',
    marginLeft: 10,
    fontSize: 10
  },
  btnText: {
    alignItems: 'flex-start',
    marginLeft: 10
  },
  btnIcon: {
    alignItems: 'flex-end',
    marginRight: 10
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
