import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Card from './Card';
import Grid from './Grid';

export interface GridLineProps {
    id: number;
    grid: Grid;
    nb: number;
    array?: Array<any>;
    values: Array<number>;
}

interface State {
    id: number;
    grid: Grid;
    array: Array<any>;
    values: Array<number>;
}

export default class GridLine extends Component<GridLineProps, State> {

    constructor(props: GridLineProps) {
        super(props);
        
        this.state = {
            id: props.id,
            grid: props.grid,
            array: new Array<any>(),
            values: props.values
        };

        for(let i = 0; i < props.nb; i++) {
            this.state.array.push({id: i});
        }
    }

    get id() { return this.state.id; }

    get grid() { return this.state.grid; }

    get array() { return this.state.array; }

    get values() { return this.state.values; }

    render() {
        return (
            <View style={styles.gridLine}>
                {this.array.map((card, key) => {
                    return (
                        <Card
                            key={this.id+"-"+card.id}
                            id={this.id+"-"+card.id}
                            grid={this.grid}
                            value={this.values[key]}
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