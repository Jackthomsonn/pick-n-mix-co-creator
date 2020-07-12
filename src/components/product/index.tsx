import { Image, StyleSheet, Text, View } from "react-native"

import { ProductProps } from "../../interfaces/IProductProps";
import React from 'react';
import { SweetSelector } from "../sweet-selector";

const Skeleton = () => {
  return (
    <View style={{
      paddingBottom: 24,
      paddingTop: 24,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 1
    }}>
      <View
        style={{
          width: 70,
          maxHeight: 100,
          height: 100,
          borderRadius: 8,
          backgroundColor: '#F9F9F9'
        }} />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 8 }}>
        <View>
          <Text style={{ fontWeight: '500', fontSize: 18, backgroundColor: '#F9F9F9', width: 200 }}></Text>
          <Text style={{ fontWeight: '500', fontSize: 14, color: '#777', marginTop: 4, width: 200, backgroundColor: '#F9F9F9' }}></Text>
        </View>
      </View>
    </View >
  );
}

export function Product({ id, name, quantity, showSelector }: ProductProps) {
  const LOADING_PRODUCT = 'Loading';

  return (
    name !== LOADING_PRODUCT
      ?
      <View style={styles.view}>
        <Image
          source={{ uri: 'https://loremflickr.com/70/100' }}
          width={70}
          height={100}
          style={{
            width: 70,
            maxHeight: 100,
            height: 100,
            borderRadius: 8
          }} />
        <View style={styles.column}>
          <View>
            <Text style={styles.productTitle}>{name}</Text>
            <Text style={styles.productSubTitle}>(V) (GF)</Text>
          </View>

          {showSelector ? <SweetSelector id={id} quantity={quantity} /> : undefined}
        </View>
      </View >
      : <Skeleton />
  )
}

const styles = StyleSheet.create({
  view: {
    paddingBottom: 24,
    paddingTop: 24,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8
  },
  productTitle: {
    fontWeight: '500',
    fontSize: 18
  },
  productSubTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#777',
    marginTop: 4
  }
})