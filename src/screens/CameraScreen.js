import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FallDetector from '../functions/FallDetector.js';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    type: Camera.Constants.Type.back,
    faces: [],

  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleFaceDetected = ({faces}) => {
    if(faces.length > 0){
      this.setState({ faces : faces });
    }
  }

  render() {
    const { hasCameraPermission, faces } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
    
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}
                  type={this.state.type}
                  ref={ ref => {this.camera = ref;}}
                  onFacesDetected={this.handleFaceDetected}
                  faceDetectorSettings={{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.none,
                    runClassifications: FaceDetector.Constants.Classifications.none,
                  }}
                  >
             <View>
                <FallDetector/>
             </View>

             <View style={styles.topBar}>
              <Text style={styles.textcolor}>x: {faces.length?faces[0].bounds.origin.x.toFixed(0) :0}</Text>
              <Text style={styles.textcolor}>y: {faces.length?faces[0].bounds.origin.y.toFixed(0) :0}</Text>
            </View>

            <View style={styles.bottomBar}>
              <Text style={styles.textcolor}>Heigth: {faces.length?faces[0].bounds.size.height.toFixed(0) :0}</Text>
              <Text style={styles.textcolor}>width: {faces.length?faces[0].bounds.size.width.toFixed(0) :0}</Text>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#000',

  },

  camera: {

    flex: 1,

    justifyContent: 'space-between',

  },

  topBar: {

    flex: 0.2,

    backgroundColor: 'transparent',

    flexDirection: 'row',

    justifyContent: 'space-around',

    paddingTop: 10+1,

  },

  bottomBar: {

    flex: 0.2,

    backgroundColor: 'transparent',

    flexDirection: 'row',

    justifyContent: 'space-around',

  },

  face: {

    padding: 10,

    borderWidth: 1,

    borderRadius: 1,

    position: 'absolute',

    borderColor: '#808000',

    justifyContent: 'center',

    backgroundColor: 'transparent',

  },

  faceText: {

    color: '#32CD32',

    fontWeight: 'bold',

    textAlign: 'center',

    margin: 10,

    backgroundColor: 'transparent',

  },

  facesContainer: {

    position: 'absolute',

    bottom: 0,

    right: 0,

    left: 0,

    top: 0,

  },

  textcolor:{

    color: '#008080',

  }

});