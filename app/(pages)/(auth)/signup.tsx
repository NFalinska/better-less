import React from 'react'
import { SIGN_UP, SLOGAN, TERMS_LINK_TEXT, TERMS_TEXT, WELCOME } from '@/constants/string'
import HeadingText from '@/components/HeadingText'
import LoginForm from './components/LoginForm'
import { ThemedText } from '@/components/ThemedText'
import { ButtonWithBackground } from '@/components/ButtonWithBgn'
import { Text, StyleSheet } from 'react-native'

export default function SignupPage() {
    return (
        <>
            <HeadingText text={WELCOME} underlineText fontSize={20} marginBottom={30} />
            <HeadingText text={SLOGAN} />
            <LoginForm signupForm />
            <ThemedText type="title" style={styles.subTitle}>
                {TERMS_TEXT}
                <Text style={styles.terms}> {TERMS_LINK_TEXT} </Text>
            </ThemedText>
            <ButtonWithBackground
                text={SIGN_UP}
                onPress={() => console.log(SIGN_UP)}
                backgroundImage={require('@/assets/images/button-bgd.png')}
            />
        </>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 10,
        fontFamily: 'PTSerif_400Regular',
        color: '#6F6C6C',
        lineHeight: 15,
        marginTop: 20,
        marginBottom: 20

    },
    terms: {
        fontFamily: 'PTSerif_700Bold'
    },
});
