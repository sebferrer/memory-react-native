import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

export default class Card extends Component {
    render() {
        return (
            <Image source={require('../assets/img/react.png')} style={{width: 50, height: 50}}/>
        );
    }
}

AppRegistry.registerComponent('Memory', () => Card);