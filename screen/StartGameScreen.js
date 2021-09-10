import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Dimensions, Button, ScrollView, KeyboardAvoidingView } from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = ({ onStartGame }) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfimred] = useState(false);
    const [selecetedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetGameHandler = () => {
        setEnteredValue('');
        setConfimred(false);
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
    
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number', 
                'Number has to be between 1 and 99.', 
                [{ text: 'Okay', style: 'destructive', onPress: resetGameHandler }]
            );
            return;
        }
        setConfimred(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selecetedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selecetedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return ( 
        <ScrollView contentContainerStyle={styles.container} >
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <BodyText style={styles.textStyle}>Select A Number</BodyText>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType='number-pad' 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue} 
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title='Reset' color={Colors.reset} onPress={resetGameHandler} />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button title='confirm' color={Colors.header} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // width: '40%'
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})
 
export default StartGameScreen;