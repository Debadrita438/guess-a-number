import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

// const renderListItem = (value, numOfRounds) => (
//     <View key={value} style={styles.listItem}>
//         <BodyText>#{numOfRounds}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
// );
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomNumber(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    // const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if(currentGuess === userChoice) {
            // onGameOver(rounds);
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
        // setRounds(prevRounds => prevRounds + 1);
        // setPastGuesses(prevGuess => [nextNumber, ...prevGuess])
        setPastGuesses(prevGuess => [nextNumber.toString(), ...prevGuess])
    }

    return(
        <View style={styles.screen}>
            <TitleText>Oppponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('higher')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
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
        marginTop: 20,
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
        // width: '60%'
        width: '100%'
    },
    listContainer: {
        flex: 1,
        // width: '80%'
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    }
})
 
export default GameScreen;