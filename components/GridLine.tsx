import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Card from './Card';
import Grid from './Grid';

export interface GridLineProps {
    id: number;
    _grid: Grid;
    nb: number;
    array?: Array<any>;
}

interface State {
    id: number;
    _grid: Grid;
    array: Array<any>;
}

export default class GridLine extends Component<GridLineProps, State> {

    constructor(props: GridLineProps) {
        super(props);
        
        this.state = { id: props.id, _grid: props._grid, array: new Array<any>() };

        for(let i = 0; i < props.nb; i++) {
            this.state.array.push({id: i});
        }
    }

    get grid() {
        return this.state._grid;
    }

    render() {
        return (
            <View style={styles.gridLine}>
                {this.state.array.map((card) => {
                    return (
                        <Card key={this.state.id+"-"+card.id} id={this.state.id+"-"+card.id} _grid={this.state._grid}/>
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