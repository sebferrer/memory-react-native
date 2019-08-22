import React from 'react';
import { StyleSheet, View } from 'react-native';
import Grid from './components/Grid';

export default function App() {
    return (
        <View style={styles.container}>
            <Grid key={"grid"} nbX={5} nbY={5} />
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
