import React, { useReducer } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { insert } from '../heplers/db';

const apiKey = 'AIzaSyBOOO0hSGNAZgil5JnZIxo5uKAk_8lDlaA';

const reducer = (state, action) => {
    //state => title, description, selectedImage ....
    //action => updatetitle => newTitle
    switch (action.updatePlaceElement) {
        case 'title':
            return { ...state, title: action.newValue }
        case 'short_description':
            return { ...state, short_description: action.newValue }
        case 'description':
            return { ...state, description: action.newValue }
        case 'setSelectedImage':
            return { ...state, selectedImage: action.newImageUri }
        case 'latitude':
            return { ...state, latitude: action.newValue }
        case 'longitude':
            return { ...state, longitude: action.newValue }
        default:
            return state;
    }
}

const CameraScreen = ({ navigation }) => {

    //const initialPlace = {title: '', description: '', selectedImage: '', latitude:'', longitude:''};
    const [state, dispatch] = useReducer(reducer, { title: '', short_description: '', description: '', selectedImage: '', latitude: '', longitude: '' });
    const { title, short_description, description, selectedImage, latitude, longitude } = state;

    let mapUri = `https://maps.googleapis.com/maps/api/staticmap?
    center=${latitude},${longitude}
    &zoom=13
    &size=600x100&
    maptype=roadmap
    &markers=color:blue%7Clabel:S%7C${latitude},${longitude}
    &key=${apiKey}`;

    const takePhotoHendler = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.4
        });
        dispatch({ updatePlaceElement: 'setSelectedImage', newImageUri: image.uri });
    }

    const managementPhotoSaver = () => {
        var isValidateForm = validateForm();
        if (isValidateForm === true) {
            savePhotoHendler;
        }
    }

    function validateForm() {
        if (title.length > 50) {
            alert("Tytuł musi mieć maksymalnie 50 znaków");
        } else if (short_description.length > 100) {
            alert("Krótki opis musi mieć maksymalnie 100 znaków")
        } else if (description != null && description.length > 255) {
            alert("Krótki opis musi mieć maksymalnie 255 znaków")
        } else if (latitude != null && -90 < latitude < 90) {
            alert("Podaj prawidłową wartość szerokości geograficznej")
        } else if (longitude != null && -180 < longitude < 180) {
            alert("Podaj prawidłową wartość długości geograficznej")
        } else return true;
        return false;
    }

    const savePhotoHendler = async () => {
        const random = Math.random().toString().substring(2);
        const pathToMoveFile = FileSystem.documentDirectory + 'image_' + random + '.jpg';
        try {
            await FileSystem.moveAsync({
                from: selectedImage,
                to: pathToMoveFile
            });

            //TODO: Add validations    
            //TODO: add correct elemetns
            insert(title, short_description, description, pathToMoveFile, latitude, longitude)
                .then(success => { console.log(success) })
                .catch(error => { console.log(error) })
            //navigation.goBack();
            navigation.navigate('Home', { refresh: random });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }



    const getPositionHendler = async () => {
        let status = await Location.requestPermissionsAsync();
        if (status && status.status !== 'granted') {
            alert('Nie masz pozwolenia na pobranie lokalizacji');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});

        dispatch({ updatePlaceElement: 'latitude', newValue: currentLocation.coords.latitude });
        dispatch({ updatePlaceElement: 'longitude', newValue: currentLocation.coords.longitude });
    }

    return (
        // TODO: ADD STYLES
        <View style={styles.homeStyle}>
            {selectedImage ?
                (<Image style={styles.imageStyle} source={{ uri: selectedImage }} />) :
                (<Text>Image not selected</Text>)
            }
            <Button
                title="Zrób zdjęcie"
                onPress={takePhotoHendler}
            />
            <View>
                <Text>Tytuł</Text>
                <TextInput onChangeText={text => dispatch({ updatePlaceElement: 'title', newValue: text })} />
            </View>
            <View>
                <Text>Krótki opis</Text>
                <TextInput onChangeText={text => dispatch({ updatePlaceElement: 'short_description', newValue: text })} />
            </View>
            <View>
                <Text>Opis</Text>
                <TextInput onChangeText={text => dispatch({ updatePlaceElement: 'description', newValue: text })} />
            </View>
            <View>
                <Text>Szerokość geograficzna</Text>
                {/* TODO: only float */}
                <TextInput onChangeText={text => dispatch({ updatePlaceElement: 'latitude', newValue: text })} value={latitude ? latitude.toString() : ''} />
            </View>
            <View>
                <Text>Długość geograficzna</Text>
                <TextInput onChangeText={text => dispatch({ updatePlaceElement: 'longitude', newValue: text })} value={longitude ? longitude.toString() : ''} />
            </View>
            <Button
                title="Pobierz lokalizację"
                onPress={getPositionHendler}
            />

            <View style={styles.mapContent}>
                {longitude ? (
                    <Image style={styles.imageStyle} source={{ uri: mapUri }} />
                ) : (<Text>Brak współrzędnych</Text>)
                }
            </View>
            <Button
                title="Save"
                onPress={managementPhotoSaver}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    homeStyle: {
        width: "100%",
        height: 400
    },
    imageStyle: {
        flex: 1
    },
    imagePlace: {
        height: 400,
    },
    mapContent: {
        width: "100%",
        height: 100
    },
});

export default CameraScreen;