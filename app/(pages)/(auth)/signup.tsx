import React from 'react'
import { SIGN_UP, SLOGAN, TERMS_LINK_TEXT, TERMS_TEXT, WELCOME } from '@/constants/string'
import HeadingText from '@/components/HeadingText'
import LoginForm from './components/LoginForm'
import { ThemedText } from '@/components/ThemedText'
import { ButtonWithBackground } from '@/components/ButtonWithBgn'
import { Text, StyleSheet, Alert } from 'react-native'
import { loginAPI } from '@/api/services/Login'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
    email: string;
    password: string;
    confirmPassword?: string;
};

export default function SignupPage() {
    const [signup, { isError, error, isSuccess }] = loginAPI.useSignupMutation();
    const { control, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();


    const onSubmitForm: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const response = await signup({ email: data.email, password: data.password });
            if (response.data) {

                Alert.alert('Success', 'Registration successful');
            } else if (response.error) {
                if ('status' in response.error) {
                    switch (response.error.status) {
                        case 404:
                            Alert.alert('Error', 'Not found');
                            break;
                        case 500:
                            Alert.alert('Error', 'Internal server error');
                            break;
                        default:
                            Alert.alert('Error', 'Something went wrong');
                    }
                } else if ('message' in response.error) {
                    Alert.alert('Error', response.error.message || 'Unexpected error');
                } else {
                    Alert.alert('Error', 'Unexpected error');
                }
            } else {
                Alert.alert('Error', 'Unexpected error.');
            }
        } catch (error) {
            Alert.alert('Error', 'Unexpected error.');
        }
    };
    


    return (
        <>
            <HeadingText text={WELCOME} underlineText fontSize={20} marginBottom={30} />
            <HeadingText text={SLOGAN} />
            <LoginForm
                signupForm={true}
                control={control}
                errors={errors}
                getValues={getValues}
            />
            <ThemedText type="title" style={styles.subTitle}>
                {TERMS_TEXT}
                <Text style={styles.terms}> {TERMS_LINK_TEXT} </Text>
            </ThemedText>
            <ButtonWithBackground
                text={SIGN_UP}
                onPress={handleSubmit(onSubmitForm)}
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
