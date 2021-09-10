import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/colors';

const MainButton = ({ children, onPress }) => {
    let ButtonComponent = TouchableOpacity;

    if(Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
}

const styles =  StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.header,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})
 
export default MainButton;