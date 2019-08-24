import React, { Component } from 'react';
import { AppRegistry, Image, ImageSourcePropType, TouchableHighlight, View, StyleSheet, Dimensions } from 'react-native';
import Grid from './Grid';

export interface CardProps {
    _id: string;
    _grid: Grid;
    _value: string;
    _imgSource?: any;
    _discovered?: boolean;
}

interface State {
    _id: string;
    _grid: Grid;
    _value: string;
    _imgSource: any;
    _discovered: boolean;
}

export default class Card extends Component<CardProps, State> {

    constructor(props: CardProps) {
        super(props);
        
        this.state = {
            _id: props._id,
            _grid: props._grid,
            _value: props._value,
            _imgSource: require('../assets/img/react.png') ,
            _discovered: false
        };

        //this.handleClick = this.handleClick.bind(this);
    }

    get id() { return this.state._id; }

    get value() { return this.state._value; }

    get grid() { return this.state._grid; }

    get imgSource() { return this.state._imgSource; }
    set imgSource(value: any) { this.setState({ _imgSource: value }); }

    get discovered() { return this.state._discovered; }
    set discovered(value: any) { this.setState({ _discovered: value }); }

    render() {
        let width = Dimensions.get('window').width;
        let cardWidth = width / this.grid.nbX;
        return (
            <View style={styles.card}>
                <TouchableHighlight onPress={() => this.handlePress()}>
                    <Image source={this.imgSource} style={{width: cardWidth, height: cardWidth}}/>
                </TouchableHighlight>
            </View>
        );
    }

    // async and await because setState is Asynchronous.
    // I chosed this method to use the typescript setters, but the best method is to use the setState callback:
    // https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately/41278440
    async handlePress() {

        // Too tired to put this in the good place right now, I need sleep...
        // Don't have the choice but to load all of the images in advance:
        // https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
        const imgs = new Map<string, any>([
            ["1", require("../assets/img/1.png")],
            ["2", require("../assets/img/2.png")],
            ["3", require("../assets/img/3.png")],
            ["4", require("../assets/img/4.png")],
            ["5", require("../assets/img/5.png")],
            ["6", require("../assets/img/6.png")],
            ["7", require("../assets/img/7.png")],
            ["8", require("../assets/img/8.png")],
            ["9", require("../assets/img/9.png")],
            ["10", require("../assets/img/10.png")],
            ["11", require("../assets/img/11.png")],
            ["12", require("../assets/img/12.png")],
            ["13", require("../assets/img/13.png")],
            ["14", require("../assets/img/14.png")],
            ["15", require("../assets/img/15.png")],
        ]);

        this.imgSource = imgs.get(this.value);

        if(this.grid.currentCard == null) {
            await (this.grid.currentCard = this);
        }
        else {
            if(!this.discovered) {
                if(this.grid.currentCard.value != this.value) {
                    this.grid.currentCard.imgSource = require('../assets/img/react.png');
                    await (this.grid.currentCard = this);
                }
                else {
                    if(this.grid.currentCard.id != this.id) {
                        this.grid.currentCard.discovered = true;
                        this.discovered = true;
                        await (this.grid.currentCard = null);
                    }
                }
            }
        }

        
       // console.log('Current picked card: ' + this.grid.currentCard.value);
    }
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
    },
});


AppRegistry.registerComponent('Memory', () => Card);