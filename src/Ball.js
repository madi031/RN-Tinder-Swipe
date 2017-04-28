'use strict';

import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component {
	componentWillMount() {
		this._position = new Animated.ValueXY(0, 0);
		Animated.spring(this._position, {
			toValue: { x: 200, y: 500 }
		}).start();	
	}
	render() {
		return (
			<Animated.View style={this._position.getLayout()}>
				<View style={styles.ball} />
			</Animated.View>
		);
	}
}

const styles = {
	ball: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 30,
		borderColor: 'black',
	},
};

module.exports = {
	Ball
};
