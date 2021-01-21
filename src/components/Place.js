import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Place = ({item, navigation}) => {

    return (
        <View style={style.itemBox}>
            <Text style={style.itemText}>{item.title}</Text>
            <Text style={style.itemText}>{item.short_description}</Text>
            <View style={style.imagePlace}>
                {item.image_uri ? (
                    <Image style={style.image} source={{ uri: item.image_uri }} />
                ) : (<Text style={style.itemTextNoImage}>Brak zdjęcia</Text>)
                }
            </View>
            <View>
                <Button
                    color="red"
                    title="Szczegóły zdjęcia"
                    onPress={() => navigation.navigate('Details', {item})}
                />
            </View>
        </View>
    )
}

// TODO: change styles
const style = StyleSheet.create({
    itemBox: {
        width: 350,
        borderColor: 'black',
        borderWidth: 2,
        marginHorizontal: 6,
        marginVertical: 10,
        backgroundColor: "#dcebd8"
    },
    itemText: {
        borderWidth: 4,
        borderColor: 'red',
        padding: 4,
        textAlign: 'center',
        marginBottom: 3,
        fontSize: 25
    },
    itemTextNoImage : {
        fontSize: 40,
        textAlign: 'center',
        borderWidth: 4,
        borderColor: 'red',
        padding: 4,
        marginTop: 150
    },
    imagePlace: {
        height: 400,
    },
    image: {
        flex: 1
    }
});

export default Place;