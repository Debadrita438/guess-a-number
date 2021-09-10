import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ rounds, userNumber, onRestart }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        paddingVertical: 10
    },
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
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        color: Colors.header,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60
    }
})
 
export default GameOver;