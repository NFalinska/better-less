import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { DecoratedText } from '@/components/DecoratedText'
import { ButtonWithBackground } from '@/components/ButtonWithBgn'
import { ACCOUNT_PROMPT, LOGIN_BUTTON_TEXT, OR_TEXT, SIGN_UP, SIGN_UP_TEXT } from '@/constants/string'
import AppLogin from './components/AppLogin'
import LoginForm from './components/LoginForm'
import HeadingText from '@/components/HeadingText'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

export type RootStackParamList = {
    Home: undefined;  
    signup: undefined; 
  };

  interface FormData {
    email: string;
    password: string;
  }


export default function LoginPage() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleSignupPress = () => {
        navigation.navigate('signup');  
    };
    return (
        <ThemedView style={styles.titleContainer}>
            <HeadingText text={SIGN_UP_TEXT} />
            <ThemedView style={styles.buttons}>
                <AppLogin />
                <DecoratedText text={OR_TEXT} />
                <ButtonWithBackground
                    text={LOGIN_BUTTON_TEXT}
                    onPress={() => console.log(LOGIN_BUTTON_TEXT)}
                    backgroundImage={require('@/assets/images/button-bgd.png')}
                />
            </ThemedView>
            <Text style={styles.text}>
                {ACCOUNT_PROMPT}
                <TouchableOpacity onPress={handleSignupPress}>
                    <Text style={styles.link}>{SIGN_UP}</Text>
                </TouchableOpacity>
            </Text>
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
});