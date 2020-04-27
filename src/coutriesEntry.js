import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class CountryEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        }
    }
    render() {
        // const [text, setText] = React.useState(true);

        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, width: 200 }}
                    placeholder="Enter country!"
                    onChangeText={(text) => this.setState({ text })}
                />

                <Button
                    title="Get Country Weather"
                    disabled={(this.state.text == '') ? true : false} 
                    onPress={() => this.props.navigation.navigate('WeatherDetails', { name: this.state.text })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CountryEntry 