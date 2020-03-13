import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import MyButton from "./MyButton";
import { MapView } from 'expo';


class Map extends Component {
    static navigationOptions = {
        title: 'Lokalizacja na mapie',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#303F9F'
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    click() {
        alert("KLik")
    }

    render() {
        var markers = [];
        var checked = this.props.navigation.state.params.check;
        for (var i = 0; i < checked.length; i++) {
            markers.push(
                <MapView.Marker
                    coordinate={{
                        latitude: checked[i].latitude,
                        longitude: checked[i].longitude,
                    }}
                    title={"MARKER " + i}
                    description={"Twoje wybrane miejsce"}
                />
            );
        }

        return (
            <View style={{ flex: 1 }}>

                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.props.navigation.state.params.check[0].latitude,
                        longitude: this.props.navigation.state.params.check[0].longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                >
                    {markers}
                </MapView>


            </View>
        );
    }

}

const styles = StyleSheet.create({
    text: { fontSize: 48, }
});

export default Map;