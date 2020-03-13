import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import { Font, Location, Permissions } from 'expo';

class List extends Component {
    static navigationOptions = {
        title: 'Zapis pozycji',
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
            wait: false,
            positions: [],
            checked: []
        };
    }

    click() {
        this.props.navigation.navigate("s3");
    }

    //UPRAWNIENIA
    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
        else {
            //this.getPosition()
        }
    }

    //POBRANIE AKTUALNEJ LOKALIZACJI
    getPosition = async () => {
        this.setState({ wait: true });
        let pos = await Location.getCurrentPositionAsync({})
        //alert(JSON.stringify(pos, null, 4))
        var actual = {
            name: pos.timestamp,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        }
        var helper = this.state.positions;
        helper.push(actual)

        this.setState({ positions: helper });

        var obj = JSON.stringify(actual);
        this.setAsyncStorage(obj);

        this.setState({ wait: false });
    }

    //DODANIE BIEŻĄCEGO ELEM DO PAMIĘCI
    setAsyncStorage = async (data) => {
        await AsyncStorage.setItem('key: location' + Math.floor(Math.random() * 10), data);
    }

    getAsyncStorage = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);

        let helper2 = [];
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            helper2.push({ name: value.name, latitude: value.latitude, longitude: value.longitude });
        });
        this.setState({ positions: helper2 });
    }

    clear = async () => {
        let tab = [];
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);

        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            tab.push(key);
        });

        AsyncStorage.multiRemove(tab, (err) => { });

        this.setState({ positions: [] });
    }

    check = (val1, val2, val3, action) => {
        if (action == 'add') {
            var checkedPleace = {
                name: val1,
                latitude: val2,
                longitude: val3
            }
            var help = this.state.checked;
            help.push(checkedPleace)

            this.setState({ checked: help });
        }
        else {
            var helpTab = this.state.checked;

            for (var i = 0; i < this.state.checked.length; i++) {
                if (this.state.checked[i].name == val1 && this.state.checked[i].latitude == val2 && this.state.checked[i].longitude == val3) {
                    helpTab.splice(i, 1)
                    break;
                }
            }

            this.setState({ checked: helpTab });
        }

    }

    showChecked = () => {
        if (this.state.checked.length >= 1) {
            this.props.navigation.navigate("s3", { check: this.state.checked });
        }
        else {
            alert('Wybierz miejsca')
        }
    }



    _keyExtractor = (item, index) => item.id;

    itemsCreate = ({ item }) => (
        <ListItem key={Math.floor(Math.random() * 10) + "place"} value1={item.name} value2={item.latitude} value3={item.longitude} check={this.check}> </ListItem>
    );

    //WYŚWIETLANIE ALERTU O UPRAWNIENIA
    componentDidMount() {
        this.setPermissions()
        this.getAsyncStorage();
        console.log("WYKONAŁO SIĘ", this.state.positions)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, flexDirection: 'row', alignContent: 'center', }}>
                    <MyButton tekst="POBIERZ I ZAPISZ POZYCJĘ" funkcja={() => this.getPosition()} />
                    <MyButton tekst="USUŃ WSZYSTKIE DANE" funkcja={() => this.clear()} />
                </View>
                <View style={{ flex: 2, flexDirection: 'row', alignContent: 'center', }}>
                    <MyButton tekst="PRZEJDŹ DO MAPY" funkcja={() => this.showChecked()} />
                </View>

                {
                    this.state.wait ?
                        <View style={{ flex: 26, flexDirection: 'column' }}>
                            <ActivityIndicator size="large" color="#00BCD4" />
                        </View>
                        :
                        <View style={{ flex: 26, flexDirection: 'column' }}>
                            <FlatList
                                data={
                                    this.state.positions
                                }
                                renderItem={this.itemsCreate}
                                keyExtractor={(item, index) => item.key}
                            />
                        </View>

                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 48, }
});

export default List;