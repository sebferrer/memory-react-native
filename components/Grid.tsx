import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';
import { GridViewModel } from '../src/viewmodel/GridViewModel';

export interface GridProps {
	viewModel: GridViewModel;
}

interface State {
	viewModel: GridViewModel;
}

export default class Grid extends Component<GridProps, State> {

	constructor(props) {
		super(props);

		props.viewModel.component = this;

		this.state = {
			viewModel: props.viewModel
		};
	}

	get viewModel() { return this.state.viewModel; }

	render() {
		return (
			<View style={styles.grid}>
				{this.viewModel.gridLines.map((gridLine, key) => {
					;
					return (
						<GridLine
							key={gridLine.id}
							viewModel={gridLine}
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