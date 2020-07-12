import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  imageBackground: {
    backgroundColor: '#FF62A3',
    minHeight: 200,
    paddingTop: 72,
    paddingStart: 24,
    paddingBottom: 24
  },
  imageBackgroundText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFF',
    width: 300
  },
  imageBackgroundSubText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFF',
    width: 300
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 24
  },
  mainViewTitle: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 12,
    width: 200,
    color: 'rgba(255, 98, 163, 0.8)'
  }
});
