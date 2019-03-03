import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';


export default class TestServer extends React.Component{
    constructor(){
        super();
        state = {
            data: '', 
            error: null,
        }
    }
    componentDidMount(){
        // this.loadCommentsFromServer();
        this.getMoviesFromApi();
        if(!this.pollInterval){
            this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
}
    }

//  loadCommentsFromServer = () => {
//     axios.get('https://shielded-badlands-23951.herokuapp.com/')  
//     .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//}

// async getMoviesFromApi() {
//   try {
//     let response = await fetch(
//       'https://cors-anywhere.herokuapp.com/http://localhost:3001/api/',
//     );
//     let responseJson = await response;
//     console.log(responseJson);
//   } catch (error) {
//     console.error(error);
//   }
// }

async getMoviesFromApi() {
  try {
    let response = await fetch(
      'https://shielded-badlands-23951.herokuapp.com/',
    );
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.error(error);
  }
}

    render(){
        // const {data} = this.state;
        return(
            <View>
                <Text>fdfdf</Text>
            </View>
        )
    }
}