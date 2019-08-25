import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';
import Card from './Card';
import * as shuffle from 'shuffle-array';

export interface GridProps {
	nbX: number;
	nbY: number;
	array?: Array<any>;
	chunks?: Array<Array<string>>;
	currentCard?: Card;
}

interface State {
	nbX: number;
	array: Array<any>;
	chunks: number[][];
	currentCard: Card;
}

export default class Grid extends Component<GridProps, State> {

	constructor(props) {
		super(props);

		if (props.nbX * props.nbY % 2 != 0) {
			throw "Number of cards must be even";
		}

		let cardValues = Array.from({ length: 15 }, (_, index) => index + 1);
		console.log(cardValues);
		cardValues = cardValues.concat(cardValues);
		cardValues = shuffle(cardValues);

		let valuesChunks = new Array<Array<number>>();
		let chunk = this.props.nbX;
		for (let i = 0, j = cardValues.length; i < j; i += chunk) {
			valuesChunks.push(cardValues.slice(i, i + chunk));
		}

		this.state = {
			array: new Array<any>(),
			currentCard: null,
			nbX: props.nbX,
			chunks: valuesChunks
		};

		for (let i = 0; i < this.props.nbY; i++) {
			this.state.array.push({ id: i });
		}
	}

	get currentCard() { return this.state.currentCard; }
	set currentCard(value: Card) { this.setState({ currentCard: value }); }

	get nbX() { return this.state.nbX; }

	get chunks() { return this.state.chunks; }

	get array() { return this.state.array; }

	render() {
		return (
			<View style={styles.grid}>
				{this.array.map((gridLine, key) => {
					;
					return (
						<GridLine
							key={gridLine.id}
							id={gridLine.id}
							nb={this.props.nbX}
							grid={this}
							values={this.chunks[key]}
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