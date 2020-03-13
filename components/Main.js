import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Font, Location, Permissions } from 'expo';
import { AsyncStorage } from "react-native";
import MyButton from "./MyButton";


class Main extends Component {
    static navigationOptions = {
        header: null,
        title: "SUPER APKA",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            a: 1,
            data: " ",
            number: 0,
            fontloaded: false,
        };

    }

    //CZCIONKI
    componentWillMount = async () => {
        await Font.loadAsync({
            'myfont': require('./CaviarDreams.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    navigateTo2() {
        this.props.navigation.navigate("s2");
    }

    render() {
        return (
            this.state.fontloaded
                ?
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, backgroundColor: "#3F51B5", alignContent: 'center', }}>
                        <Text style={{ flex: 1, }}></Text>
                        <Text style={styles.text}>Geo Map App</Text>
                        <Text style={styles.textMin}>Find and save your position</Text>
                        <Text style={{ flex: 1, }}></Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <MyButton tekst="START" funkcja={() => this.navigateTo2()} />
                    </View>
                </View>
                :
                <View>
                    <Text>Nie działa</Text>
                </View>

        );
    }
}

const styles = StyleSheet.create({
    text: { 
        fontSize: 48,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'myfont',
    },
    textMin: {
        fontSize: 14,
        color: '#C5CAE9',
        textAlign: 'center',
        fontFamily: 'myfont',
    }
});

export default Main;