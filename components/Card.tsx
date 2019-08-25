import React, { Component } from 'react';
import { AppRegistry, Dimensions, Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { CardViewModel } from '../src/viewmodel/CardViewModel';
import { gameState } from '../App';

export interface CardProps {
	viewModel: CardViewModel;
}

interface State {
    viewModel: CardViewModel;
}

export default class Card extends Component<CardProps, State> {

	constructor(props: CardProps) {
        super(props);

        props.viewModel.component = this;

		this.state = {
			viewModel: props.viewModel
		};
	}

	get viewModel() { return this.state.viewModel; }

	render() {
		let width = Dimensions.get('window').width;
		let cardWidth = width / this.viewModel.grid.nbX;
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={() => this.handlePress()}>
					<Image source={this.viewModel.imgSource} style={{ width: cardWidth, height: cardWidth }} />
				</TouchableHighlight>
			</View>
		);
	}

	// async and await because setState is Asynchronous.
	// I chosed this method to use the typescript setters, but the best method is to use the setState callback:
	// https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately/41278440
	handlePress() {
        this.viewModel.imgSource = gameState.imgs[this.viewModel.value];
        this.setState({ viewModel: this.viewModel });
        
        // There's .viewModels everywhere, that's ugly.
        // Need to find a solution about it.

		if (gameState.currentCard == null) {
            gameState.currentCard = this.viewModel;
            this.setState({ viewModel: this.viewModel });
		}
		else if (!this.viewModel.discovered) {
			if (gameState.currentCard.value != this.viewModel.value) {
                if(!gameState.currentCard.discovered) {
                    gameState.currentCard.imgSource = gameState.defaultImg;
                    gameState.currentCard.component.setState({ viewModel: gameState.currentCard });
                }
                gameState.currentCard = this.viewModel;
                this.setState({ viewModel: this.viewModel });
			}
			else if (gameState.currentCard.id != this.viewModel.id) {
                gameState.currentCard.discovered = true;
				this.viewModel.discovered = true;
                gameState.currentCard.component.setState({ viewModel: gameState.currentCard });
                this.setState({ viewModel: this.viewModel });
			}
		}
        // console.log('Current picked card: ' + gameState.currentCard.id);
        
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

AppRegistry.registerComponent('Memory', () => Card);