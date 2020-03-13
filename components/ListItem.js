import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MyButton from "./MyButton"
import { red } from 'ansi-colors';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: '',
            check: 1
        };
        this.test = this.test.bind(this);
    }

    componentDidMount() {

    }

    test = () => {
        if (this.state.check % 2 == 0) {
            this.props.check(this.props.value1, this.props.value2, this.props.value3, 'del');
        }
        else {
            this.props.check(this.props.value1, this.props.value2, this.props.value3, 'add');
        }
        this.setState({ check: this.state.check + 1, });
    }

    show = () => {
        this.props.navigateFun(this.state.nick, this.state.passwd);
    }

    render() {
        return (
            <View style={styles.view} key={this.props.value1 + "ITEM"}>

                <Image
                    key={this.props.value1 + "IMG"}
                    source={require('./map-icon.png')}
                    style={{ flex: 1, height: 40, width: 'auto', alignSelf: "center", resizeMode: 'contain' }}
                />

                <View style={{ flex: 2, alignSelf: "center", flexDirection: 'column' }} key={this.props.value1 + "-view"}>
                    <View style={{ flex: 1 }}></View>
                    <Text style={{ flex: 1, textAlign: 'left', flexDirection: 'row', fontSize: 10, fontWeight: 'bold' }} key={this.props.value1 + "-val1"}>timestamp: {this.props.value1}</Text>

                    <Text style={{ flex: 1, textAlign: 'left', flexDirection: 'row', fontSize: 10 }} key={this.props.value3 + "-val2"}>latitude: {this.props.value2}</Text>

                    <Text style={{ flex: 1, textAlign: 'left', flexDirection: 'row', fontSize: 10 }} key={this.props.value3 + "-val3"}>longitude: {this.props.value3}</Text>
                    <View style={{ flex: 1 }}></View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity style={{ alignSelf: 'center', width: 40, }} onPress={this.test} >
                        {
                            this.state.check % 2 == 0 ?
                                <Image
                                    key={this.props.login + "Inc2"}
                                    source={require('./check1.png')}
                                    style={{ height: 40, width: 'auto', resizeMode: 'contain' }}
                                    key={this.props.value1 + "-img1"}
                                />
                                :
                                <Image
                                    key={this.props.login + "Inc2"}
                                    source={require('./check.png')}
                                    style={{ height: 40, width: 'auto', resizeMode: 'contain' }}
                                    key={this.props.value1 + "-img2"}
                                />
                        }
                    </TouchableOpacity>
                </View>


            </View>


        );
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        alignSelf: 'baseline',
        alignContent: 'center',
        justifyContent: "space-between"
    }
});

export default ListItem;

