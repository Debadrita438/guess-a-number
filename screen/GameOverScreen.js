import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ rounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/success.png')} 
                    // source={{uri: 'https://static.euronews.com/articles/stories/05/26/61/88/400x225_cmsv2_7fce538a-0a0e-5133-bf70-24ec472d5618-5266188.jpg'}} 
                    style={styles.image} 
                    resizeMode='cover' 
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.text}>
                    Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the 
                    number <Text style={styles.highlight}>{userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={onRestart}>NEW GAME</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    space: {
        marginBottom: 10
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.header,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    }
})
 
export default GameOver;