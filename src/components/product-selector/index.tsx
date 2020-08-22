import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native"

import { Environment } from "../../environment/environment";
import { HttpClient } from "../../services/httpClient/httpClient";
import { SweetsService } from "../../services/sweets/sweets.service";

export function ProductSelector() {
  const [ selectedId, setSelectedId ] = useState();
  const [ products, setProducts ] = useState([]);

  const getAvailableProducts = async () => {
    const products = await HttpClient.get(`${ Environment.API_URI }/api/getProducts`);

    setProducts(products);

    setSelectedId(products[ 0 ].stripeProductReference);
    SweetsService.updateSelectedProductId(products[ 0 ].stripeProductReference);
    SweetsService.updateSelectedProductPrice(products[ 0 ].price);

    SweetsService.updateAmountOfSweetsToBeSelected(products[ 0 ].amountOfSweets);
  }

  const notifyOfSelectedProduct = (product: any) => {
    setSelectedId(product.stripeProductReference);

    SweetsService.updateSelectedProductId(product.stripeProductReference);
    SweetsService.updateSelectedProductPrice(product.price);
    SweetsService.updateAmountOfSweetsToBeSelected(product.amountOfSweets);
  }

  useEffect(() => {
    getAvailableProducts();
  }, [])

  const buttonRenderer = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { notifyOfSelectedProduct(item) }} style={{
        borderWidth: 1,
        borderColor: selectedId === item.stripeProductReference ? 'rgba(255, 98, 163, 1)' : 'rgba(255, 98, 163, 0.2)',
        backgroundColor: selectedId === item.stripeProductReference ? 'rgba(255, 98, 163, 1)' : 'rgba(255, 98, 163, 0.2)',
        padding: 8,
        width: 80,
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 24
      }}>
        <Text style={{ color: selectedId === item.stripeProductReference ? '#FFF' : 'rgba(255, 98, 163, 1)', }}>{item.weight === 500 ? `500g (£${ item.price / 100 })` : `1kg (£${ item.price / 100 })`}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.view}>
      <FlatList data={products} renderItem={buttonRenderer} horizontal={true} keyExtractor={(item) => item.name}></FlatList>
    </View >
  )
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#FFF',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1
  },
  image: {
    width: 30,
    height: 30
  }
})
