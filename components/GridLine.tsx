import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Card from './Card';
import Grid from './Grid';

export interface GridLineProps {
    _id: number;
    _grid: Grid;
    nb: number;
    _array?: Array<any>;
    _values: Array<string>;
}

interface State {
    _id: number;
    _grid: Grid;
    _array: Array<any>;
    _values: Array<string>;
}

export default class GridLine extends Component<GridLineProps, State> {

    constructor(props: GridLineProps) {
        super(props);
        
        this.state = {
            _id: props._id,
            _grid: props._grid,
            _array: new Array<any>(),
            _values: props._values
        };

        for(let i = 0; i < props.nb; i++) {
            this.state._array.push({id: i});
        }
    }

    get id() { return this.state._id; }

    get grid() { return this.state._grid; }

    get array() { return this.state._array; }

    get values() { return this.state._values; }

    render() {
        return (
            <View style={styles.gridLine}>
                {this.array.map((card, key) => {
                    return (
                        <Card
                            key={this.id+"-"+card.id}
                            _id={this.id+"-"+card.id}
                            _grid={this.grid}
                            _value={this.values[key]}
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