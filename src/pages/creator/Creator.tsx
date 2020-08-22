import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { createRef, useEffect, useState } from 'react';

import ActionSheet from "react-native-actions-sheet";
import { Environment } from '../../environment/environment';
import { HttpClient } from '../../services/httpClient/httpClient';
import { Product } from '../../components/product/index';
import { ProductSelector } from '../../components/product-selector';
import { SweetsService } from '../../services/sweets/sweets.service';
import { globalStyles } from '../../styles/global-styles';
import { useIsFocused } from '@react-navigation/native';

const actionSheetRef: any = createRef();

export function CreatorScreen(props: any) {
  let actionSheet;

  const [ formIsValid, setFormValidity ] = useState(false);
  const [ inventory, setInventory ]: any = useState([]);
  const [ currentTotalOfSelectedSweets, setCurrentTotalOfSelectedSweets ] = useState(0);
  const [ amountOfSweetsToBeSelected, setAmountOfSweetsToBeSelected ] = useState(0);
  const isFocused = useIsFocused();

  const createCheckoutSession = async () => {
    const checkoutSessionToken = await HttpClient.get(`${ Environment.API_URI }/api/createCheckoutSession?productId=${ SweetsService.selectedProductId }&productPrice=${ SweetsService.selectedProductPrice }`);

    props.navigation.navigate('Checkout', {
      checkoutSessionToken: checkoutSessionToken,
      productId: SweetsService.selectedProductId
    });
  };

  const getInventory = async () => {
    const response: any = await HttpClient.get(`${ Environment.API_URI }/api/getInventory`);

    setInventory(response);
  };

  useEffect(() => {
    SweetsService.onChange.subscribe(changeEvent => {
      if (changeEvent.type === 'checkValidity') {
        setFormValidity(changeEvent.value);
      }

      if (changeEvent.type === 'sweetSelected') {
        setCurrentTotalOfSelectedSweets(changeEvent.value);
      }

      if (changeEvent.type === 'amountOfSweetsUpdate') {
        setAmountOfSweetsToBeSelected(changeEvent.value);
      }
    });

    if (isFocused) {
      if (props.route.params?.successfulTransaction) {
        SweetsService.selectedSweetIds = [];
        setCurrentTotalOfSelectedSweets(0);
        setTimeout(() => {
          actionSheetRef.current?.setModalVisible();
          SweetsService.onChange.next({
            type: 'resetSweetSelections',
            value: false
          });

          SweetsService.onChange.next({
            type: 'checkValidity',
            value: false
          })
        }, 500);
      }

      getInventory();
    }
  }, [ isFocused ]);

  return (
    <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <View style={globalStyles.imageBackground}>
        <Text style={globalStyles.imageBackgroundText}>Welcome to the Pick 'n' Mix Co creator!</Text>
        <Text style={globalStyles.imageBackgroundSubText}>Choose your weight, select your sweets and recieve your sweets within 2-3 working days</Text>

        <Text style={styles.chosenSweetsText}>You have chosen {<Text style={{ fontWeight: '700' }}>{currentTotalOfSelectedSweets}</Text>} sweets out of a possible {<Text style={{ fontWeight: '700' }}>{amountOfSweetsToBeSelected}</Text>}</Text>

        {
          currentTotalOfSelectedSweets > amountOfSweetsToBeSelected
            ? <Text style={styles.errorText}>Whoops it looks like you are over by {currentTotalOfSelectedSweets - amountOfSweetsToBeSelected}! Make sure you choose the 1kg option if you would like more!</Text>
            : undefined
        }
      </View>
      <ProductSelector />
      <FlatList
        data={inventory.length > 0 ? inventory : [ { id: 1, name: 'Loading' } ]}
        style={{ flex: 1, backgroundColor: '#FFF', padding: 24 }}
        ListFooterComponent={() => {
          return (
            <View style={{ backgroundColor: 'rgba(255, 98, 163, 1)', padding: 8, borderRadius: 8, marginBottom: 48 }}>
              <Button onPress={() => { createCheckoutSession(); }} title={'Buy now'} color={'#FFF'} disabled={!formIsValid || currentTotalOfSelectedSweets > amountOfSweetsToBeSelected}></Button>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any, index: number) => item.name + index}
        renderItem={({ item }: any) => <Product id={item.id} name={item.name} quantity={item.quantity} showSelector={true} />
        }
      />

      <ActionSheet ref={actionSheetRef} headerAlwaysVisible={true} footerAlwaysVisible={true} closable={true} gestureEnabled={false}>
        <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 500 }}>
          <View>
            <Image source={require('../../../assets/images/on-the-way.png')} width={200} height={200} style={{ margin: 24, width: 200, height: 200, alignSelf: 'center' }} />
            <Text style={{ color: 'rgba(255, 98, 163, 0.8)', fontSize: 28, fontWeight: '500', textAlign: 'center', width: 350 }}>Your order is on its way!</Text>
            <Text style={{ color: 'rgba(255, 98, 163, 0.6)', fontSize: 16, fontWeight: '400', textAlign: 'center', width: 350, marginTop: 12 }}>Your order will be with you in 2-3 days! We will send you an email when your order has shipped</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255, 98, 163, 0.2)', padding: 8, borderRadius: 8, marginBottom: 48, width: 250 }}>
            <Button onPress={() => { actionSheetRef.current?.setModalVisible() }} title={'Close'} color={'rgba(255, 98, 163, 0.7)'}></Button>
          </View>
        </View>
      </ActionSheet>
    </View >
  );
}

const styles = StyleSheet.create({
  chosenSweetsText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFF',
    width: 300,
    marginTop: 24
  },
  errorText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#FFF',
    width: 300,
    marginTop: 24
  }
})
