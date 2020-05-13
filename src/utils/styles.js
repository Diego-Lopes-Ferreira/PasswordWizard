import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export const bgColor = '#555555';
export const red = '#ff2244';
export const main = '#ffffff';
export const detail = '#aaaaaa';

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
  header: {
    width: '100%',
    padding: 5,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: '#444',
  },
  slice: {
    flexDirection: 'row',
  },
  sliceWPadd: {
    flexDirection: 'row',
    paddingVertical: 2.5,
  },
  sliceOutside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliceSettingsLang: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  scrollview: {
    width: '100%',
    padding: 10,
  },
  svSettings: {
    width: '90%',
    padding: 10,
  },
  container: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#000000',
    padding: 10,
    marginBottom: 10,
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
  txtWarning: {
    width: '100%',
    textAlign: 'left',
    color: '#ff2244',
    fontSize: 22,
  },
  txtGnormal: {
    color: main,
    fontSize: 22,
  },
  txtMnormal: {
    color: main,
    fontSize: 18,
  },
  txtPgrey: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  txtLangPt: {
    color: '#ff4466',
    fontSize: 18,
  },
  txtLangEn: {
    color: '#81b0ff',
    fontSize: 18,
  },
  txtTitle: {
    width: '100%',
    textAlign: 'center',
    color: main,
    fontSize: 22,
  },
  txtHGreeting: {
    textAlign: 'center',
    color: main,
    fontSize: 16,
  },
  txtHUsername: {
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    color: main,
    fontSize: 16,
    fontWeight: 'bold',
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
  hBtn: {
    padding: 5,
  },
  // inputs
  inputFocused: {
    marginVertical: 15,
    paddingHorizontal: 10,
    height: 40,
    width: '95%',
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
