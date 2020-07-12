import React, { useState } from 'react';

import { Environment } from '../../environment/environment';
import { HttpClient } from '../../services/httpClient/httpClient';
import StripeCheckoutSca from 'expo-stripe-checkout-sca';
import { SweetsService } from '../../services/sweets/sweets.service';

export function CheckoutScreen(props) {
  const [ modalVisible, setModalVisible ] = useState(true);

  const handleNavigationStateChange = async (event: any) => {
    if (event.url == `${ Environment.API_URI }/api/startOrder` && !event.navigationType) {
      try {
        await HttpClient.post(`${ Environment.API_URI }/api/createOrder?selectedSweetIds=${ JSON.stringify(SweetsService.selectedSweetIds) }`, {
          data: {
            lineItems: {
              create: {
                product: {
                  connect: {
                    stripeProductReference: props.route.params.productId
                  }
                },
                productOptions: {
                  create: SweetsService.selectedSweetIds.map(selectedSweetId => {
                    return {
                      inventoryItem: {
                        connect: {
                          id: selectedSweetId
                        }
                      }
                    }
                  })
                }
              }
            }
          }
        }, {
          stripe_address_reference: props.route.params.checkoutSessionToken
        });

        close();

        props.navigation.navigate('Creator', {
          successfulTransaction: true
        })
      } catch (e) {
        throw e;
      }
    } else if (event.url === `${ Environment.API_URI }/api/cancelOrder`) {
      close();

      props.navigation.navigate('Creator', {
        successfulTransaction: false
      })
    }
  }

  const close = () => {
    setModalVisible(false);
  }

  return (
    <StripeCheckoutSca modalVisible={modalVisible}
      onClose={() => close()}
      onNavigationStateChange={event => handleNavigationStateChange(event)}
      publicKey="pk_test_CSoObVGF1VapNcOz7acWvmcw00lNtjlUbk"
      sessionId={props.route.params.checkoutSessionToken}
    />
  )
}