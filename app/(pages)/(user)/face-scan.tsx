import {ActivityIndicator, Animated, Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import {ThemedView} from '@/components/ThemedView'
import {ButtonWithBackground} from '@/components/ButtonWithBgn'
import {useRouter} from 'expo-router';
import HeadingText from "@/components/HeadingText";
import * as ImagePicker from 'expo-image-picker';
import {loginAPI} from "@/api/services/Login";
import {userAPI} from "@/api/services/User";
import { detectClothing } from '@/utils/detectClothing'; // Функція для обробки зображення
//import axios from 'axios';

export default function FaceScanPage() {
    const [image, setImage] = useState<string | null>(null);
    const [clothingItems, setClothingItems] = useState<any[]>([]); // Масив виявленого одягу
    const [loadFaceScan, {isError, error, isSuccess}] = userAPI.useUploadPhotoMutation();
    const [loading, setLoading] = useState<boolean>(false); // 🔥 Стан завантаження
    // Запит дозволу на доступ до камери та галереї
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Помилка", "Дозвіл на використання камери відхилено");
            return false;
        }
        return true;
    };
    // Анімація миготіння
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const blinkAnimation = useRef<Animated.CompositeAnimation | null>(null);
    useEffect(() => {
        if (loading) {
            // Починаємо миготіння
            blinkAnimation.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
                    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                ])
            );
            blinkAnimation.current?.start();
        } else {
            // Зупиняємо миготіння і повертаємо до 1
            blinkAnimation.current?.stop();
            fadeAnim.setValue(1);
        }
    }, [loading]);
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

        // Виклик `detectClothing` після вибору зображення
    useEffect(() => {
        if (image) {
            setLoading(true); // 🔥 Показуємо спіннер
            detectClothing(image)
                .then(items => {
                    setClothingItems(items);
                    Alert.alert("Виявлений одяг", JSON.stringify(items));
                    console.log("Виявлений одяг:", items);
                })
                .catch(error => {
                    console.error("Помилка розпізнавання:", error);
                    Alert.alert("Помилка", "Не вдалося розпізнати одяг.");
                })
                .finally(() => {
                    setLoading(false); // 🔥 Ховаємо спіннер
                });
        }
    }, [image]);


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
                {image && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />

                        {/* 🔥 Спіннер + текст на зображенні */}
                        {loading && (
                            <View style={styles.overlay}>
                                <ActivityIndicator size="large" color="white" />
                                <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                                    Розпізнаю одяг...
                                </Animated.Text>
                            </View>
                        )}
                    </View>
                )}

                {!loading && clothingItems.length > 0 && (
                    <Text style={styles.detectedText}>Виявлено: {clothingItems.join(", ")}</Text>
                )}
            </View>

            <ButtonWithBackground
                text={'Take a picture'}
                onPress={takePhoto}
                backgroundImage={require('@/assets/images/button-bgd.png')}
                disabled={loading}
            />
            <ButtonWithBackground
                text={'Choose a picture'}
                onPress={pickImage}
                backgroundImage={require('@/assets/images/button-bgd.png')}
                disabled={loading}
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
    imageContainer: {
        position: 'relative', // Відносне позиціонування для оверлею
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
        marginBottom: 20,
    },
    detectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 10,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 🔥 Прозорий чорний фон
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

