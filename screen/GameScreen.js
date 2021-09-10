import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as ScreenOrientation from 'expo-screen-orientation';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';

const generateRandomNumber = (min, max, exclude) => {
    const Min = Math.ceil(min);
    const Max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (Max-Min)) + Min;
    if(rndNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    } else {
        return rndNumber;
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomNumber(1, 100, userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availabledeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availabledeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);
        return() => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < userChoice) || (direction === 'higher' && currentGuess > userChoice)) {
            Alert.alert(
                'Don\'t Lie!', 
                'You know that this is wrong....', 
                [{ text: 'Sorry!', style: 'cancel' }]
            );
            return;
        } 
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(prevGuess => [nextNumber.toString(), ...prevGuess])
    }

    let listContainerStyle = styles.listContainer;

    if(availabledeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    let gameControl = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card 
                style={{...styles.buttonContainer, 
                marginTop: Dimensions.get('window').height > 600 ? 20 : 5
                }}
            >
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('higher')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
        </React.Fragment>
    );

    if(availabledeviceHeight < 500) {
        gameControl = (
            <View style={styles.controls}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={() => nextGuessHandler('higher')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </View>
        );
    }

    return(
        <View style={styles.screen}>
            <TitleText>Oppponent's Guess</TitleText>
            {gameControl}
            <View style={listContainerStyle}>
                <FlatList 
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    }
})
 
export default GameScreen;