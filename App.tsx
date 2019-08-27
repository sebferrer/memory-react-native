import React from 'react';
import { StyleSheet, View } from 'react-native';
import Grid from './components/Grid';
import Activity from './Activity';

export const app = new Activity();

export default function App() {
    
    return (
        <View style={styles.container}>
            <Grid key={"grid"} viewModel={app.grid} />
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