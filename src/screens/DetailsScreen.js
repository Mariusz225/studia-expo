import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const DetailsScreen = ({ route }) => {
    const imageDetails = route.params.item;
    return (
        <View style={style.homeStyle}>
            <Text>{imageDetails.title}</Text>
            <Text>{imageDetails.short_description}</Text>
            <Text>{imageDetails.description}</Text>
            <View style={style.imagePlace}>
                {imageDetails.image_uri ? (
                    <Image style={style.image} source={{ uri: imageDetails.image_uri }} />
                ) : (<Text>Brak zdjęcia</Text>)
                }
            </View>
            <Text>Lat: {imageDetails.latitude}</Text>
            <Text>Lng: {imageDetails.longitude}</Text>

        </View>
    );
}

//TODO: Add correct styles
const style = StyleSheet.create({
    homeStyle: {

    },
    imagePlace: {
        height: 400,
    },
    image: {
        flex: 1
    }
});

export default DetailsScreen;