import { StyleSheet } from 'react-native';

const bgColor = '#555555';
const red = '#ff2244';
const main = '#ffffff';
const detail = '#aaaaaa';

const styles = StyleSheet.create({
  // views
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColor,
  },
  registerContainer: {
    width: '90%',
    height: 200,
    padding: 10,
  },
  image: {
    flex: 1, 
    resizeMode: "cover", 
    justifyContent: "center",
  },
  // texts
  txtG: {
    width: '100%',
    textAlign: 'left',
    color: main,
    fontSize: 22,
  },
  txtTitle: {
    width: '100%',
    textAlign: 'center',
    color: main,
    fontSize: 22,
  },
  txtWrong: {
    width: '100%',
    textAlign: 'right',
    paddingHorizontal: '10%',
    color: red,
  },
  // touchableopacits / buttons
  submit: {
    alignSelf: 'center',
    padding: 20,
  },
  // inputs
  inputFocused: {
    marginVertical: 15,
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
    color: main,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: main,
    borderWidth: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputBlured: {
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
    color: main,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: detail,
    borderWidth: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  notShowing: {
    display: 'none',
  }
});

export default styles;
