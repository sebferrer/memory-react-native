import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import GridLine from './GridLine';

export interface GridProps {
    nbX: number;
    nbY: number;
    array?: Array<any>;
}

interface State {
    array: Array<any>;
}

export default class Grid extends Component<GridProps, State> {

    constructor(props) {
        super(props);

        this.state = { array: new Array<any>() };

        for(let i = 0; i < this.props.nbY; i++) {
            this.state.array.push({id: i});
        }
    }

    render() {
        return (
            <View style={styles.grid}>
                {this.state.array.map((prop, key) => {;
                    return (
                        <GridLine key={prop.id} nb={this.props.nbX} />
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