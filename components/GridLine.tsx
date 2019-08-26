import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Card from './Card';
import { GridLineViewModel } from '../src/viewmodel/GridLineViewModel';

export interface GridLineProps {
    viewModel: GridLineViewModel;
}

interface State {
    viewModel: GridLineViewModel;
}

export default class GridLine extends Component<GridLineProps, State> {

    constructor(props: GridLineProps) {
        super(props);

        props.viewModel.c = this;
        
        this.state = {
            viewModel: props.viewModel
        };
    }

    get vm() { return this.state.viewModel; }

	update() { this.setState({ viewModel: this.vm }) }

    render() {
        return (
            <View style={styles.gridLine}>
                {this.vm.cards.map((card, key) => {
                    return (
                        <Card
                            key={card.id}
                            viewModel={card}
                        />
                    );
                })} 
             </View>
        );
    }
}

const styles = StyleSheet.create({
    gridLine: {
            display: 'flex',
            flexDirection:'row',
            flexWrap:'wrap'
        },
    });

AppRegistry.registerComponent('Memory', () => GridLine);