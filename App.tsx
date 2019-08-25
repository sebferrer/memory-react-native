import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GameState } from './src/gameState';
import Grid from './components/Grid';
import { GridViewModel } from './src/viewmodel/GridViewModel';

export const gameState = new GameState(new GridViewModel("grid", 5, 6));

export default function App() {
    
    return (
        <View style={styles.container}>
            <Grid key={"grid"} viewModel={gameState.grid} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
