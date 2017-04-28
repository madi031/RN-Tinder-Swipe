'use strict';

import React, { Component } from 'react';
import {
	Animated,
	Dimensions,
	LayoutAnimation,
	PanResponder,
	StyleSheet,
	UIManager,
	View,
} from 'react-native';
import { dataItem } from '../TinderSwipe';

type Props = {
	data: dataItem,
	onSwipeLeft: Function,
	onSwipeRight: Function,
	renderCard: Function,
	renderNoMoreCards: Function,
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
	static defaultProps = {
		onSwipeLeft: () => {},
		onSwipeRight: () => {},
	}

	constructor(props: Props) {
		super(props);
		const _position = new Animated.ValueXY();
		const _panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				_position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					this._forceSwipe('right');
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this._forceSwipe('left');
				} else {
					this._resetPosition();
				}
			},
		});
		this.state = { 
			panResponder: _panResponder, 
			position: _position, 
			index: 0,
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.data !== this.props.data) {
			this.setState({ index: 0 });
		}
	}

	componentWillUpdate() {
		UIManager.setLayoutAnimationEnabledExperimental && 
		UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.linear();
	}

	_forceSwipe(direction: string) {
		const xDir = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
		Animated.timing(this.state.position, {
			toValue: { x: xDir, y: 0 },
			duration: SWIPE_OUT_DURATION,
		}).start(() => this._onSwipeComplete(direction));
	}

	_onSwipeComplete(direction: string) {
		const { onSwipeLeft, onSwipeRight, data } = this.props;
		const _item = data[this.state.index];

		direction === 'right' ? onSwipeRight(_item) : onSwipeLeft(_item);
		this.state.position.setValue({ x: 0, y: 0 });
		this.setState({ index: this.state.index + 1 });
	}

	_resetPosition() {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 }
		}).start();
	}

	_getCardStyle() {
		const { position } = this.state;
		const _rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-240deg', '0deg', '240deg']
		});
		return {
			...position.getLayout(),
			transform: [{ rotate: _rotate }],
		};
	}

	_renderCards() {
		if (this.state.index >= this.props.data.length) {
			return this.props.renderNoMoreCards();
		}

		return this.props.data.map((item, iter) => {
			if (iter < this.state.index) {
				return null;
			}
			if (iter === this.state.index) {
				return (
					<Animated.View
						key={item.id}
						style={[this._getCardStyle(), styles.cardStyle]}
						{...this.state.panResponder.panHandlers}
					>
						{this.props.renderCard(item)}
					</Animated.View>
				);
			}
			return (
				<Animated.View 
					key={item.id} 
					style={[styles.cardStyle, { top: 10 * (iter - this.state.index) }]}
				>
					{this.props.renderCard(item)}
				</Animated.View>
			);
		}).reverse();
	}

	render() {
		return (
			<View>
				{this._renderCards()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH,
	},
});

module.exports = {
	Deck,
};
