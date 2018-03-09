import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#F4F4F4',
    height: 60
  },
  btn: {
    backgroundColor: '#3F97E3',
    height: 40,
    width: 180,
    borderRadius: 20,
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  }
});
