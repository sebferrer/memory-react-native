import React, { Component } from 'react';
import { AppRegistry, Image, ImageSourcePropType, TouchableHighlight } from 'react-native';
import Grid from './Grid';

export interface CardProps {
    id: string;
    _grid: Grid;
    _imgSource?: any;
}

interface State {
    id: string;
    _grid: Grid;
    _imgSource: any;
}

export default class Card extends Component<CardProps, State> {

    constructor(props: CardProps) {
        super(props);

        this.state = { id: props.id, _grid: props._grid, _imgSource: require('../assets/img/react.png') };

        //this.handleClick = this.handleClick.bind(this);
    }

    get grid() {
        return this.state._grid;
    }

    get imgSource() {
        return this.state._imgSource;
    }

    set imgSource(value: any) {
        this.setState({
            _imgSource: value
          });
    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.handlePress()}>
                <Image source={this.imgSource} style={{width: 50, height: 50}}/>
            </TouchableHighlight>
        );
    }

    handlePress() {
        this.grid.currentCard = this.state.id;
        //console.log('Current picked card: ' + this.grid.currentCard);

        this.imgSource = require('../assets/img/gon.png');
    }
}

AppRegistry.registerComponent('Memory', () => Card);