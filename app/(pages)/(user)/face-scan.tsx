import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useState } from 'react';
import {ThemedView} from '@/components/ThemedView'
import {ButtonWithBackground} from '@/components/ButtonWithBgn'
import {useRouter} from 'expo-router';
import HeadingText from "@/components/HeadingText";
import * as ImagePicker from 'expo-image-picker';
import {loginAPI} from "@/api/services/Login";
import {userAPI} from "@/api/services/User";
//import axios from 'axios';

export default function FaceScanPage() {
    const [image, setImage] = useState<string | null>(null);
    const [loadFaceScan, {isError, error, isSuccess}] = userAPI.useUploadPhotoMutation();
    // Запит дозволу на доступ до камери та галереї
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Помилка", "Дозвіл на використання камери відхилено");
            return false;
        }
        return true;
    };

    // Вибір фото з галереї
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Зйомка фото з камери
    const takePhoto = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const uploadImage = async () => {
        if (!image) {
            Alert.alert("Помилка", "Вибери або зроби фото спочатку!");
            return;
        }

        let formData = new FormData();
        formData.append("file", {
            uri: image,
            name: "upload.jpg",
            type: "image/jpeg",
        } as any);

        try {
            const response = await loadFaceScan(formData).unwrap();
            Alert.alert("Успіх", "Фото завантажене!");
            console.log(response);
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося завантажити фото");
            console.error(error);
        }
    };

    const router = useRouter()
    const handleCabinetPress = () => {
        router.navigate('cabinet');
    };

    return (
        <ThemedView style={styles.buttons}>
            <HeadingText text='Let’s start with scanning your face' />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
            </View>

            <ButtonWithBackground
                text={'Take a picture'}
                onPress={takePhoto}
                backgroundImage={require('@/assets/images/button-bgd.png')}
            />
            <ButtonWithBackground
                text={'Choose a picture'}
                onPress={pickImage}
                backgroundImage={require('@/assets/images/button-bgd.png')}
            />
            <ButtonWithBackground
                text={'Upload a picture'}
                onPress={uploadImage}
                disabled={!image}
                backgroundImage={require('@/assets/images/button-bgd.png')}
            />
            <ButtonWithBackground
                text={'Skip'}
                onPress={handleCabinetPress}
                backgroundImage={require('@/assets/images/button-yellow-bgd.png')}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 0,
        marginRight: '5%',
        marginBottom: 20,
        marginLeft: '5%',
    },
    buttons: {
        marginTop: 25,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
        marginTop: 15,
        fontFamily: 'PTSerif_400Regular',
    },
    link: {
        color: '#CFE1F5',
        textDecorationLine: 'underline',
        paddingLeft: 10
    },
    container: {
        flex: 1, // Розтягує контейнер на весь екран
        justifyContent: 'center', // Центрує по вертикалі
        alignItems: 'center', // Центрує по горизонталі
        backgroundColor: '#fff', // Фон (опціонально)
    },
    image: {
        width: 200,
        height: 200,
    },
});