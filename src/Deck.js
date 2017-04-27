'use strict';

import React, { Component } from 'react';
import {
	Animated,
	PanResponder,
	View,
} from 'react-native';
import { dataItem } from '../TinderSwipe';

type Props = {
	data: dataItem,
	renderCard: Function,
}

class Deck extends Component {
	constructor(props: Props) {
		super(props);
		const _position = new Animated.ValueXY();
		const _panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				_position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPanResponderRelease: () => {}
		});
		this.state = { 
			panResponder: _panResponder, 
			position: _position, 
		};
	}

	_renderCards() {
		return this.props.data.map(item => {
			return this.props.renderCard(item);
		});
	}

	render() {
		return (
			<Animated.View
				style={this.state.position.getLayout()}
				{...this.state.panResponder.panHandlers}
			>
				{this._renderCards()}
			</Animated.View>
		);
	}
}

module.exports = {
	Deck,
};
