import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
    return (
        <View style={{ 
            ...styles.headerBase,  
            ...Platform.select({ 
                ios: styles.headerIOS, 
                android: styles.headerAndroid 
            })
        }}>
            <TitleText style={styles.headerTitle}>{title}</TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.header
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.header : 'white'
    }
});
 
export default Header;