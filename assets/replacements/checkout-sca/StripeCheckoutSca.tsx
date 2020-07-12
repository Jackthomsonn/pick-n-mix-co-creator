/*
 * Copyright (C) Christian Ascone - All Rights Reserved
 *
 * @project    expo-stripe-checkout-sca
 * @file       StripeCheckoutSca.tsx
 * @author     Christian Ascone
 * @date       11/21/19 12:20 PM
 */

import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import React, { Component } from 'react';

import Import from './import';

interface StripeCheckoutScaProps {
  publicKey: string,
  webViewStyle?: StyleProp<ViewStyle>,
  sessionId: string,
  onClose: () => void,
  onNavigationStateChange: (any) => void,
  modalVisible: boolean,
  closeButtonContainerStyle?: StyleProp<ViewStyle>,
  closeButtonInnerStyle?: StyleProp<TextStyle>,
}

class StripeCheckoutSca extends Component<StripeCheckoutScaProps, any> {
  render() {
    const {
      publicKey,
      webViewStyle,
      onClose,
      sessionId,
      onNavigationStateChange,
      modalVisible,
      closeButtonContainerStyle,
      closeButtonInnerStyle,
    } = this.props;


    return (
      <Import.Modal
        animationType={'slide'}
        visible={modalVisible}
        transparent={false}
        onRequestClose={() => { }}>
        <View style={{ height: 50 }}></View>
        <Import.WebView
          javaScriptEnabled={true}
          scrollEnabled={true}
          bounces={false}
          originWhitelist={[ "*" ]}
          startInLoadingState={true}
          onNavigationStateChange={(e) => onNavigationStateChange(e)}
          source={{
            html:
              `<script src="https://js.stripe.com/v3"></script>
                          <script>
                          var stripe = Stripe('${publicKey }');
                          window.onload = function() {
                              stripe.redirectToCheckout({ sessionId: '${sessionId }' }).then(function (result) {
                                window.postMessage("WINDOW_CLOSED", "*");
                              });
                          };
                          window.addEventListener('popstate', function (event)
{
  alert('going back');
});
                          </script>`,
            baseUrl: ''
          }}
          onMessage={event => event.nativeEvent.data === 'WINDOW_CLOSED' ? onClose() : console.log('Event: ' + event.nativeEvent.data)}
          style={[ { flex: 1 }, webViewStyle ]}
          scalesPageToFit={Platform.OS === 'android'}
        />
      </Import.Modal>
    );
  }
}

const styles = StyleSheet.create({
  closeButtonOpacity: {
    width: 30,
    height: 30,
    marginTop: 60,
    marginLeft: 12,
    backgroundColor: '#EEE',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#777',
  },
});

export default StripeCheckoutSca;
