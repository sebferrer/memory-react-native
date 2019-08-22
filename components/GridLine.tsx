import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Card from './Card';

export interface GridLineProps {
    nb: number;
    array?: Array<any>;
}

interface State {
    array: Array<any>;
}

export default class GridLine extends Component<GridLineProps, State> {

    constructor(props: GridLineProps) {
        super(props);
        
        this.state = { array: new Array<any>() };

        for(let i = 0; i < props.nb; i++) {
            this.state.array.push({id: i});
        }
    }

    render() {
        return (
            <View style={styles.gridLine}>
                {this.state.array.map((prop) => {
                    return (
                        <Card key={prop.id}/>
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