import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native"

import { Ionicons } from '@expo/vector-icons';
import { SweetsService } from "../../services/sweets/sweets.service";
import { TouchableOpacity } from "react-native-gesture-handler";

export function SweetSelector({ id, quantity }) {
  const [ timesClicked, setTimesClicked ] = useState(0);
  const [ formIsValid, setFormValidity ] = useState();

  const MAX_SELECTION_PER_SWEET = 2;

  const setSelectedSweet = (type: string) => {
    if (type === 'decrement' && timesClicked === 0) {
      return;
    }

    if (type === 'increment') {
      setTimesClicked(timesClicked + 1);
      SweetsService.updateSelectedSweets(id, 'increment');
    } else {
      setTimesClicked(timesClicked - 1);
      SweetsService.updateSelectedSweets(id, 'decrement');
    }
  }

  useEffect(() => {
    SweetsService.onChange.subscribe(changeEvent => {
      if (changeEvent.type === 'checkValidity') {
        setFormValidity(changeEvent.value);
      }
    });
  });

  return (
    quantity !== 0 ?
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          style={
            {
              backgroundColor: 'rgba(255,98,163, 0.2)',
              width: 30,
              height: 30,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
          onPress={() => setSelectedSweet('decrement')}>
          <Ionicons name="ios-remove" color="rgba(255,98,163, 1)" size={25} />
        </TouchableOpacity>
        <Text> {timesClicked}</Text>
        <TouchableOpacity
          disabled={formIsValid || quantity === 0 || quantity - timesClicked === 0 || timesClicked === MAX_SELECTION_PER_SWEET}
          style={{
            backgroundColor: 'rgba(255,98,163, 0.2)',
            width: 30,
            height: 30,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setSelectedSweet('increment')}>
          <Ionicons name="ios-add" color="rgba(255,98,163, 1)" size={25} />
        </TouchableOpacity>
      </View>
      : <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        alignItems: 'center',
        backgroundColor: 'rgba(255,98,163, 0.2)',
        padding: 8,
        borderRadius: 4,
      }}>
        <Text style={{ color: 'rgba(255,98,163, 1)' }}>Out of stock</Text>
      </View>
  );
}