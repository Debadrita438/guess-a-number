import React, { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, View } from 'react-native';

import Card from './Card';
import Colors from '../constants/colors';
import Input from './Input';
import NumberContainer from './NumberContainer';
import BodyText from './BodyText';
import MainButton from './MainButton';

const NumberInput = ({ onStartGame }) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfimred] = useState(false);
    const [selecetedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetGameHandler = () => {
        setEnteredValue('');
        setConfimred(false);
    }

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
        <View>
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
                    <View style={styles.button}>
                        <Button title='Reset' color={Colors.reset} onPress={resetGameHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title='confirm' color={Colors.header} onPress={confirmInputHandler} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
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
    button: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})
 
export default NumberInput;