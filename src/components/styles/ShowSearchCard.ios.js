import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#ECEDED',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  cardImage: {
    width: 60,
    height: 35,
    backgroundColor: '#f1eff0'
  },
  cardTextBlack: {
    width: 200,
    marginLeft: 40
  },
  cardTextGrey: {
    width: 200,
    marginLeft: 40,
    color: '#f1eff0'
  }
});
