import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = ({ children, style }) => <Text style={{...styles.title, ...style}}>{children}</Text>

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});

export default TitleText;