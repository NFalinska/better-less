import React from 'react';
import { TouchableOpacity, Image, Text, GestureResponderEvent, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
    iconSource: ImageSourcePropType;
    text: string;
    onPress: (event: GestureResponderEvent) => void;
};

export function ButtonIcon({ iconSource, text, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Image source={iconSource} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

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
    icon: {
        width: 30,
        height: 30,
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'PTSerif_700Bold',
    },
});
