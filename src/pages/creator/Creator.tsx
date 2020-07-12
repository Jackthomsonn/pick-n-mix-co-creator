import { Button, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Environment } from '../../environment/environment';
import { HttpClient } from '../../services/httpClient/httpClient';
import { Product } from '../../components/product/index';
import { ProductSelector } from '../../components/product-selector';
import { SweetsService } from '../../services/sweets/sweets.service';
import { globalStyles } from '../../styles/global-styles';
import { useIsFocused } from '@react-navigation/native';

export function CreatorScreen(props: any) {
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
    console.log(response);
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
      }

      getInventory();
    }
  }, [ isFocused ]);

  return (
    <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ImageBackground source={require('../../../assets/images/dots.png')} style={globalStyles.imageBackground}>
        <Text style={globalStyles.imageBackgroundText}>Welcome to the Pick 'n' Mix Co creator!</Text>
        <Text style={globalStyles.imageBackgroundSubText}>Choose your weight, select your sweets and recieve your sweets within 2-3 working days</Text>

        <Text style={styles.chosenSweetsText}>You have chosen {currentTotalOfSelectedSweets} sweets out of a possible {amountOfSweetsToBeSelected}</Text>

        {
          currentTotalOfSelectedSweets > amountOfSweetsToBeSelected
            ? <Text style={styles.errorText}>Whoops it looks like you are over by {currentTotalOfSelectedSweets - amountOfSweetsToBeSelected}! Make sure you choose the 1kg option if you would like more!</Text>
            : undefined
        }
      </ImageBackground>
      <ProductSelector />
      <FlatList
        data={inventory.length > 0 ? inventory : [ { id: 1, name: 'Loading' } ]}
        style={{ flex: 1, backgroundColor: '#FFF', padding: 24 }}
        ListFooterComponent={() => {
          return (
            <View style={{ backgroundColor: 'rgba(255, 98, 163, 1)', padding: 8, borderRadius: 8, marginBottom: 48 }}>
              <Button onPress={() => { createCheckoutSession(); }} title={'Buy now'} color={'#FFF'} disabled={!formIsValid}></Button>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.name}
        renderItem={({ item }: any) => <Product id={item.id} name={item.name} quantity={item.quantity} showSelector={true} />
        }
      />
    </View>
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
