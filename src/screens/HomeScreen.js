import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, FlatList } from 'react-native';
import Place from "../components/Place";
import { select } from "../heplers/db";

const HomeScreen = ({ navigation, route }) => {

    const [placeTab, setPlaceTab] = useState([]);
    useEffect(
        () => {
            const fetchData = async () => {
                try {
                    const fetch = await select();
                    setPlaceTab(fetch.rows._array);
                } catch (err) {
                    throw err;
                }
            }
            fetchData();
        },
        [route.params.refresh]
    );
    return (
        <View style={style.homeViewStyle}>
            <View>
                <Button
                    title="Zrób zdjęcie"
                    onPress={() => navigation.navigate('Camera')}
                />
            </View>
            <FlatList
                data={placeTab}
                renderItem={
                    ({ item }) => {
                        return (
                            <Place item={item} navigation={navigation} />
                        )
                    }
                }
                keyExtractor={item => Math.random().toString()}
            />
        </View>
    );
}

const style = StyleSheet.create({
    homeViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;