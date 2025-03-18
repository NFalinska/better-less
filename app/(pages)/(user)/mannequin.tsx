import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {ThemedView} from '@/components/ThemedView'
import {ButtonWithBackground} from '@/components/ButtonWithBgn'
import {useRouter} from 'expo-router';

export default function MannequinPage() {
    const router = useRouter()
    const handleCabinetPress = () => {
        router.navigate('cabinet');
    };
    const handleCreateMannequinPress = () => {
        router.navigate('face-scan');
    };

    return (
        <ThemedView style={styles.buttons}>
            <View style={styles.container}>
                <Image
                    source={require('@/assets/images/empty-mannequin.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <ButtonWithBackground
                text={'Create your mannequin'}
                onPress={handleCreateMannequinPress}
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