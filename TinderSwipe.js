import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Deck } from './src/Deck';

export type dataItem = {
	id: number, 
	text: String, 
	uri: String,
};

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png' },
  { id: 2, text: 'Card #2', uri: 'https://cdn.pixabay.com/photo/2016/12/17/14/33/wave-1913559_1280.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://www.allaboutbirds.org/guide/PHOTO/LARGE/bald_eagle_adult2.jpg' },
  { id: 4, text: 'Card #4', uri: 'https://www.w3schools.com/css/trolltunga.jpg' },
  { id: 5, text: 'Card #5', uri: 'https://cdn.pixabay.com/photo/2016/10/07/13/00/yucca-plant-1721515_1280.jpg' },
  { id: 6, text: 'Card #6', uri: 'https://cdn.pixabay.com/photo/2014/07/06/16/50/winter-385640_1280.jpg' },
  { id: 7, text: 'Card #7', uri: 'https://cdn.pixabay.com/photo/2012/03/04/00/36/snow-21979_1280.jpg' },
  { id: 8, text: 'Card #8', uri: 'https://cdn.pixabay.com/photo/2012/03/01/01/34/winter-20234_1280.jpg' },
];

export default class TinderSwipe extends Component {
  _renderCard(item: dataItem) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          I can customize further
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          title='View Now!'
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
          data={DATA}
          renderCard={this._renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
