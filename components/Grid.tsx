import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';

export interface GridProps {
    nbX: number;
    nbY: number;
    array?: Array<any>;
    _currentCard?: string;
}

interface State {
    array: Array<any>;
    _currentCard: string;
}

export default class Grid extends Component<GridProps, State> {

    constructor(props) {
        super(props);

        this.state = { array: new Array<any>(), _currentCard: null };

        for(let i = 0; i < this.props.nbY; i++) {
            this.state.array.push({id: i});
        }
    }

    get currentCard() {
        return this.state._currentCard;
    }

    set currentCard(value: string) {
        this.setState({
            _currentCard: value
          });
    }

    render() {
        return (
            <View style={styles.grid}>
                {this.state.array.map((gridLine, key) => {;
                    return (
                        <GridLine key={gridLine.id} id={gridLine.id} nb={this.props.nbX} _grid={this} />
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