import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';
import Card from './Card';

export interface GridProps {
    nbX: number;
    nbY: number;
    _array?: Array<any>;
    _chunks?: Array<Array<string>>;
    _currentCard?: Card;
}

interface State {
    _array: Array<any>;
    _chunks: Array<Array<string>>;
    _currentCard: Card;
}

export default class Grid extends Component<GridProps, State> {

    constructor(props) {
        super(props);

        if(props.nbX * props.nbY % 2 != 0) {
            throw "Number of cards must be even";
        }

        let shuffle = require('shuffle-array');
        let cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
        cardValues = cardValues.concat(cardValues);
        cardValues = shuffle(cardValues);

        let valuesChunks = new Array<Array<string>>();
        let chunk = this.props.nbX;
        for (let i = 0, j = cardValues.length; i < j; i += chunk) {
            valuesChunks.push(cardValues.slice(i ,i + chunk));
        }

        this.state = {
            _array: new Array<any>(),
            _currentCard: null,
            _chunks: valuesChunks
        };

        for(let i = 0; i < this.props.nbY; i++) {
            this.state._array.push({id: i});
        }
    }

    get currentCard() { return this.state._currentCard; }
    set currentCard(value: Card) { this.setState({ _currentCard: value }); }

    get chunks() { return this.state._chunks; }

    get array() { return this.state._array; }

    render() {
        return (
            <View style={styles.grid}>
                {this.array.map((gridLine, key) => {;
                    return (
                        <GridLine
                             key={gridLine.id}
                            _id={gridLine.id}
                            nb={this.props.nbX}
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