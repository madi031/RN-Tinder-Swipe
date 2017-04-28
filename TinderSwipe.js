import React, { Component } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Deck } from './src/Deck';

export type dataItem = {
	id: number, 
	text: string, 
	uri: string,
};

const SCREEN_HEIGHT = Dimensions.get('window').height * 0.50;
const DATA = [
  { id: 1, text: 'Stark', words: 'Winter is Coming!!', uri: 'https://static.comicvine.com/uploads/original/12/123851/2498561-stark_sigil.jpg' },
  { id: 2, text: 'Lannister', words: 'Hear me Roar!!', uri: 'https://vignette3.wikia.nocookie.net/gameofthrones/images/8/8a/House-Lannister-Main-Shield.PNG/revision/latest?cb=20170101095357' },
  { id: 3, text: 'Targaryen', words: 'Fire and Blood!!', uri: 'https://vignette2.wikia.nocookie.net/gameofthrones/images/4/43/House-Targaryen-Main-Shield.PNG/revision/latest?cb=20161206005534' },
  { id: 4, text: 'Baratheon', words: 'Ours is the Fury!!', uri: 'https://s-media-cache-ak0.pinimg.com/originals/fe/83/ab/fe83ab8f186d180e8790564bf5a137ec.jpg' },
  { id: 5, text: 'Tully', words: 'Family, Duty, Honor!!', uri: 'https://ladygeekgirl.files.wordpress.com/2015/02/house-tully.jpg' },
  { id: 6, text: 'Tyrell', words: 'Growing Strong!!', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZC5SLpOlTAwI-c3koJFBKTh71JG2y7S2_8vr4wwT1pM6sJdJnJg' },
  { id: 7, text: 'Martell', words: 'Unbowed, Unbent, Unbroken!!', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPZW3uvk_cesO04W5Wc7V1zToJxJY5rrODz-8BaS7UgJKYfCvw' },
  { id: 8, text: 'Greyjoy', words: 'We Do Not Sow!!', uri: 'https://i.ytimg.com/vi/ELwCpGR-rkU/maxresdefault.jpg' },
];

export default class TinderSwipe extends Component {
  _renderCard(item: dataItem) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.textStyle}>
          {item.words}
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#345298'
          title='View Now!'
        />
      </Card>
    );
  }
	
  _renderNoMoreCards() {
    return (
			<Card title='All Done!'>
				<Text style={{ marginBottom: 10 }}>
					No more items to show!!
				</Text>
				<Button
					backgroundColor='#03A9F4'
					title='Get more!'
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
          renderNoMoreCards={this._renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		top: 10,
	},
	imageStyle: {
		height: SCREEN_HEIGHT,
	},
	textStyle: {
		marginBottom: 10, 
		fontWeight: 'bold', 
		fontSize: 20,
		textAlign: 'center',
  },
});
