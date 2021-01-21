import React, { useState, useReducer } from 'react';
import { View, Text, TextInput } from 'react-native';

const reducer = (state, action) => {
    //state => {a: 'a1', b: 'b2', c: 'c1'}
    //action => {set: 'a', value: nowaWartość }
    switch (action.set) {
        case 'a':
            return { ...state, a: action.value, d: state.c }
        case 'b':
            return { ...state, b: action.value }
        case 'c':
            return { ...state, c: action.value }
    }
}
const Example = ({ route }) => {
    // const [a, setA] = useState('a1');
    // const [b, setB] = useState('b1');
    // const [c, setC] = useState('c1');
    const stateInit = { a: 'a1', b: 'b2', c: 'c1', d: '' }
    const [state, dispatch] = useReducer(reducer, stateInit);
    // const {a ,b, c} = state;
    //state = {a: 'nowa wartosc', b: 'b2', c: 'c1'}
    return (
        <View>
            <Text style={{ fontSize: 30 }}>Podaj a:</Text>
            <TextInput style={{ fontSize: 30, borderWidth: 1, borderColor: "red" }}
                onChangeText={(textA) => { dispatch({ set: 'a', value: textA }) }} value={state.a} />

            <Text style={{ fontSize: 30 }}>Podaj b:</Text>
            <TextInput style={{ fontSize: 30, borderWidth: 1, borderColor: "red" }}
                onChangeText={(textB) => { dispatch({ set: 'b', value: textB }) }} value={state.b} />

            <Text style={{ fontSize: 30 }}>Podaj c:</Text>
            <TextInput style={{ fontSize: 30, borderWidth: 1, borderColor: "red" }}
                onChangeText={(textC) => { dispatch({ set: 'c', value: textC }) }} value={state.c} />

            <Text style={{ fontSize: 50 }}>a = {state.a}</Text>
            <Text style={{ fontSize: 50 }}>b = {state.b}</Text>
            <Text style={{ fontSize: 50 }}>c = {state.c}</Text>
            <Text style={{ fontSize: 50 }}>d = {state.d}</Text>
        </View>
    );
}

export default Example;