import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  eachDeal: {
    borderColor: '#EAEBED',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    width: 355
  },
  float: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10
  },
  offerText: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -5,
    color: '#04C897',
    fontSize: 18,
    // fontWeight: 'bold'
  },
  subTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subText: {
    fontSize: 10
  }
});
