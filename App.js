import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import GameOver from './screen/GameOverScreen';
import GameScreen from './screen/GameScreen';
import StartGameScreen from './screen/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [usernumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={err => console.log(err)} 
    />;
  }

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(usernumber && guessRounds <= 0) {
    content = <GameScreen userChoice={usernumber} onGameOver={gameOverHandler} />
  } else if(guessRounds > 0) {
    content = <GameOver rounds={guessRounds} userNumber={usernumber} onRestart={configNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <Header title='Guess A Number!' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
