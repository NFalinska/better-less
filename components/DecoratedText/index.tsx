import React from 'react';
import { StyleSheet,View } from 'react-native';
import { ThemedText } from '../ThemedText';

type Props = {
    text: string;
};

export function DecoratedText({ text }: Props) {
    return (
        <View style={styles.or}>
            <View style={styles.orLine}></View>
            <ThemedText type="title" style={styles.orText}>{text}</ThemedText>
            <View style={styles.orLine}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    or: {
        color: '#8D8D8D',
        fontSize: 16,
        fontFamily: 'PTSerif_400Regular',
        textAlign: 'center',  
        alignItems: 'center',  
        flexDirection: 'row',  
        marginVertical: 20,  
      },
      orLine: {
        flex: 1,  
        height: 1,  
        backgroundColor: '#8D8D8D',  
        marginHorizontal: 10,
      },
      orText: {
        color: '#8D8D8D',
        fontSize: 16,
        fontFamily: 'PTSerif_400Regular',
      }
});
