import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { CardViewModel } from '../src/viewmodel/CardViewModel';
import { name as appName } from '../app.json';

export interface CardProps {
	viewModel: CardViewModel;
}

interface State {
    viewModel: CardViewModel;
}

export default class Card extends Component<CardProps, State> {

	constructor(props: CardProps) {
		super(props);
		
		props.viewModel.c = this;

		this.state = {
			viewModel: props.viewModel
		};
	}

	get vm() { return this.state.viewModel; }

	update() {
		this.setState({ viewModel: this.vm });
	}

	render() {
		let width = Dimensions.get('window').width;
		let cardWidth = width / this.vm.grid.nbX;
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={() => this.handlePress()}>
					<Image source={this.vm.imgSource} style={{ width: cardWidth, height: cardWidth }} />
				</TouchableHighlight>
			</View>
		);
	}

	// async and await because setState is Asynchronous.
	// I chosed this method to use the typescript setters, but the best method is to use the setState callback:
	// https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately/41278440
	handlePress() {
        this.vm.imgSource = this.vm.app.imgs[this.vm.value - 1];

		if (this.vm.app.currentCard == null) {
            this.vm.app.currentCard = this.vm;
		}
		else if (!this.vm.discovered) {
			if (this.vm.app.currentCard.value != this.vm.value) {
                if(!this.vm.app.currentCard.discovered) {
                    this.vm.app.currentCard.imgSource = this.vm.app.defaultImg;
                    this.vm.app.currentCard.c.update();
                }
                this.vm.app.currentCard = this.vm;
			}
			else if (this.vm.app.currentCard.id != this.vm.id) {
                this.vm.app.currentCard.discovered = true;
				this.vm.discovered = true;
                this.vm.app.currentCard.c.update();
			}
		}
		this.update();

        // console.log('Current picked card: ' + gameState.currentCard.id + ' - ' + gameState.currentCard.value);
        
        // NOTE: We don't have to write all of the setState of this function if we do this one:
        // this.viewModel.grid.component.setState({ viewModel: this.viewModel.grid });
        // In this case, the grid is entirely rendered at each call instead of render cards separately.
        // This allows to not write setState every time we set an argument, but it's obvilously a waste
        // of resources to render useless things, and not surprisly it's slower...
	}
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
	},
});

AppRegistry.registerComponent(appName, () => Card);