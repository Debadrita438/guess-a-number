import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ({ children, style }) => <Text style={{...styles.body, ...style}}>{children}</Text>

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans',
        fontSize: 16
    }
});

export default BodyText;