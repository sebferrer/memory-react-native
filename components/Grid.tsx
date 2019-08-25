import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';
import Card from './Card';
import * as shuffle from 'shuffle-array';

export interface GridProps {
	_nbX: number;
	nbY: number;
	_array?: Array<any>;
	_chunks?: Array<Array<string>>;
	_currentCard?: Card;
}

interface State {
	_nbX: number;
	_array: Array<any>;
	_chunks: number[][];
	_currentCard: Card;
}

export default class Grid extends Component<GridProps, State> {

	constructor(props) {
		super(props);

		if (props._nbX * props.nbY % 2 != 0) {
			throw "Number of cards must be even";
		}

		let cardValues = Array.from({ length: 15 }, (_, index) => index + 1);
		console.log(cardValues);
		cardValues = cardValues.concat(cardValues);
		cardValues = shuffle(cardValues);

		let valuesChunks = new Array<Array<number>>();
		let chunk = this.props._nbX;
		for (let i = 0, j = cardValues.length; i < j; i += chunk) {
			valuesChunks.push(cardValues.slice(i, i + chunk));
		}

		this.state = {
			_array: new Array<any>(),
			_currentCard: null,
			_nbX: props._nbX,
			_chunks: valuesChunks
		};

		for (let i = 0; i < this.props.nbY; i++) {
			this.state._array.push({ id: i });
		}
	}

	get currentCard() { return this.state._currentCard; }
	set currentCard(value: Card) { this.setState({ _currentCard: value }); }

	get nbX() { return this.state._nbX; }

	get chunks() { return this.state._chunks; }

	get array() { return this.state._array; }

	render() {
		return (
			<View style={styles.grid}>
				{this.array.map((gridLine, key) => {
					;
					return (
						<GridLine
							key={gridLine.id}
							_id={gridLine.id}
							nb={this.props._nbX}
							_grid={this}
							_values={this.chunks[key]}
						/>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grid: {
		display: 'flex',
	},
});

AppRegistry.registerComponent('Memory', () => Grid);