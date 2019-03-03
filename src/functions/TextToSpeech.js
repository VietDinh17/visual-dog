import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import { Constants, Speech } from 'expo';


if (!Constants.isDevice) {
  alert('Hey, this will not work on the Appetize preview! Open it on your device')
}

export default class TextToSpeechScreen extends React.Component {

  componentDidMount()   {
      this._speak();
  }

  componentWillUnmount()    {
      this._stop();
  }

  state = {
    inProgress: false,
    pitch: 1,
    rate: 0.75,
  };

  _speak = () => {
    const start = () => {
      this.setState({ inProgress: true });
    };
    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    const text= "There " + (this.props.numberOfPeople >= 1 ? "are " : "is ") + this.props.numberOfPeople 
    + (this.props.numberOfPeople > 1 ? "person " : "people ") + "ahead";

    if (this.props.numberOfPeople >= 1) Speech.speak(text, {
      language: 'en',
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    });
  }

  _stop= () => {
      Speech.stop();
  }

  render() {
    return (
      <View id='Text-to-speech'></View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 0,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 20,
  },
  exampleText: {
    fontSize: 15,
    color: '#ccc',
    marginVertical: 10,
  },
  examplesContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  selectedExampleText: {
    color: 'black',
  },
  controlText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});