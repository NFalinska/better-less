import { StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { ThemedText } from '../ThemedText';

type Props = {
    text: string;
    underlineText?: boolean;
    fontSize?: number;
    marginBottom?: number;
}

export default function HeadingText({ text, underlineText, fontSize = 16, marginBottom = 10 }: Props) {
    return (
        <ThemedText
            type="title"
            style={[styles.title, { fontSize, marginBottom }, underlineText && styles.underline]}
        >
            {text}
        </ThemedText>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'PTSerif_700Bold',
        textAlign: 'center',
    } as TextStyle,
    underline: {
        textDecorationLine: 'none',
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        paddingBottom: 3, 
        marginRight: '33%',
        marginLeft: '33%',
    },
});