import React from 'react';
import { TouchableOpacity, ImageBackground, Text, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
    text: string;
    onPress: () => void;
    backgroundImage: ImageSourcePropType;
};

export const ButtonWithBackground = ({ text, onPress, backgroundImage }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.buttonImage}>
                <Text style={styles.text}>{text}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginTop: 20,
        height: 50,
        width: '100%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        overflow: 'hidden'
    },
    buttonImage: {
        borderRadius: 5,
        opacity: 0.8,
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'PTSerif_700Bold',
    },
});