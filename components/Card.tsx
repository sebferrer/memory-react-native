import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import Grid from './Grid';

export interface CardProps {
	id: string;
	grid: Grid;
	value: number;
	imgSource?: any;
	discovered?: boolean;
}

interface State {
	id: string;
	grid: Grid;
	value: number;
	imgSource: any;
	discovered: boolean;
}

export default class Card extends Component<CardProps, State> {

	constructor(props: CardProps) {
		super(props);

		this.state = {
			id: props.id,
			grid: props.grid,
			value: props.value,
			imgSource: require('../assets/img/react.png'),
			discovered: false
		};

		//this.handleClick = this.handleClick.bind(this);
	}

	get id() { return this.state.id; }

	get value(): number { return this.state.value; }

	get grid() { return this.state.grid; }

	get imgSource() { return this.state.imgSource; }
	set imgSource(value: any) { this.setState({ imgSource: value }); }

	get discovered() { return this.state.discovered; }
	set discovered(value: any) { this.setState({ discovered: value }); }

	render() {
		let width = Dimensions.get('window').width;
		let cardWidth = width / this.grid.nbX;
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={() => this.handlePress()}>
					<Image source={this.imgSource} style={{ width: cardWidth, height: cardWidth }} />
				</TouchableHighlight>
			</View>
		);
	}

	// async and await because setState is Asynchronous.
	// I chosed this method to use the typescript setters, but the best method is to use the setState callback:
	// https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately/41278440
	async handlePress() {

		// Too tired to put this in the good place right now, I need sleep...
		// Don't have the choice but to load all of the images in advance:
		// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
		const imgs = [
			require("../assets/img/1.png"),
			require("../assets/img/2.png"),
			require("../assets/img/3.png"),
			require("../assets/img/4.png"),
			require("../assets/img/5.png"),
			require("../assets/img/6.png"),
			require("../assets/img/7.png"),
			require("../assets/img/8.png"),
			require("../assets/img/9.png"),
			require("../assets/img/10.png"),
			require("../assets/img/11.png"),
			require("../assets/img/12.png"),
			require("../assets/img/13.png"),
			require("../assets/img/14.png"),
			require("../assets/img/15.png"),
		];

		this.imgSource = imgs[this.value];

		if (this.grid.currentCard == null) {
			await (this.grid.currentCard = this);
		}
		else if (!this.discovered) {
			if (this.grid.currentCard.value != this.value) {
				this.grid.currentCard.imgSource = require('../assets/img/react.png');
				await (this.grid.currentCard = this);
			}
			else if (this.grid.currentCard.id != this.id) {
				this.grid.currentCard.discovered = true;
				this.discovered = true;
				await (this.grid.currentCard = null);
			}
		}
		// console.log('Current picked card: ' + this.grid.currentCard.value);
	}
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
	},
});


AppRegistry.registerComponent('Memory', () => Card);