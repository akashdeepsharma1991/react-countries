import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,FlatList,Image, Button } from 'react-native';


function Item({ capital,population,lat ,long,img}) {

    return (
        <View style={styles.item}>
            <Text style={styles.title}>Capital: {capital}</Text>
            <Text style={styles.title}>population: {population}</Text>
            <Text style={styles.title}>Latitude : {lat}</Text>
            <Text style={styles.title}>Longitude: {long}</Text>
            
        </View>
    );
}

export default class CountryDetails extends React.Component {
  constructor(props){
      super(props);
      const text = this.props.route.params.name;
      this.state = {
        dataArray: [],
    }
      
  }

  componentDidMount() {
      this.getWeatherDetails(this.props.route.params.name)
  }

  getWeatherDetails(name) {
    return fetch('https://restcountries.eu/rest/v2/name/'+name.toUpperCase())
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson,'i m called');
            this.setData(responseJson)
            // this.setState({ arrayHolder: [...this.DATA] })
            // console.log(DATA);
            // return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

getWeatherDetailCity(capital){
    return fetch('http://api.weatherstack.com/current?access_key=8e44c28387dd47700ad0ddb992ba351f&query='+capital.toUpperCase())
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson,'i m called');
            // this.setData(responseJson)
            // this.setState({ arrayHolder: [...this.DATA] })
            // console.log(DATA);
            // return responseJson;
            let str = 'temperature' + responseJson.current.temperature +', wind_speed' + responseJson.current.wind_speed + ', precip ' + responseJson.current.precip  
            alert(str)
        })
        .catch((error) => {
            console.error(error);
        });
}

setData(data) {
    this.setState({ arrayHolder: [...data] })
}

    render() {
    return (

        <SafeAreaView style={styles.container}>
        <FlatList
        
            data={this.state.arrayHolder}
            renderItem={({ item }) => (
                <View>
                
                    <Item capital={item.capital} population={item.population} lat={item.latlng[0]} long={item.latlng[1]} img={item.flag} />
                    <Button 
            title="Get Temperture" 
            onPress={() => this.getWeatherDetailCity(item.capital)}/>

            </View>
            
            )
        }
            keyExtractor={item => item.capital}
            
        />
    </SafeAreaView>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
},
title: {
    fontSize: 18,
    marginTop:10
},
tinyLogo: {
    width: 50,
    height: 50,
  },
});