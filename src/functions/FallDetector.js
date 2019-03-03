import React from 'react';
import {ShakeEventExpo} from './ShakeEventExpo';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class FallDetector extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
        accelerometerData: {},
        isFall: false
    };
  }

  componentWillMount() {
    ShakeEventExpo.addListener(() => {
        console.log('shaken');
        this.setState({isFall: true});
        this.onFall();
    });
  }

  componentWillUnmount() {
    ShakeEventExpo.removeListener();
  }

  onFall = () => {
    this.setState({isFall:false});
    fetch('https://shielded-badlands-23951.herokuapp.com/alert', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  }

  render() {

    return (
      <View style={styles.sensor}>
        <Text>Accelerometer:</Text>
        <Text> 
         {this.state.isFall ? 'fall' : 'not fall'}
        </Text>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
    backgroundColor: 'transparent'
  },
});
