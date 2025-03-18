import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { DecoratedText } from '@/components/DecoratedText'
import { ButtonWithBackground } from '@/components/ButtonWithBgn'
import { ACCOUNT_PROMPT, LOGIN_BUTTON_TEXT, OR_TEXT, SIGN_UP, SIGN_UP_TEXT } from '@/constants/string'
import AppLogin from './components/AppLogin'
import LoginForm from './components/LoginForm'
import HeadingText from '@/components/HeadingText'
// import { NavigationProp, useNavigation } from '@react-navigation/native'
import {loginAPI} from '@/api/services/Login'
import {SubmitHandler, useForm} from 'react-hook-form'
import { setToken } from '@/api/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from 'expo-router';

// export type RootStackParamList = {
//     Home: undefined;
//     signup: undefined;
//     mannequin: undefined;
//   };

  interface FormData {
    email: string;
    password: string;
  }

export default function LoginPage() {
    const [login, {isError, error, isSuccess}] = loginAPI.useLoginMutation();
    // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const router = useRouter();
    const {control, handleSubmit, getValues, formState: {errors}, setError} = useForm<FormData>();
    const dispatch = useDispatch();

    const handleSignupPress = () => {
        router.navigate('signup');
    };

    const handleMannequinPress = () => {
        router.navigate('mannequin');
    };

    const onSubmitLoginForm: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const response = await login({email: data.email, password: data.password});
            if (response.data) {
                if (response.data.errors) {
                    if (response.data.errors.email) {
                        setError("email", { type: "server", message: response.data.errors.email });
                    }
                    if (response.data.errors.password) {
                        setError("password", { type: "server", message: response.data.errors.password });
                    }
                }
                dispatch(setToken(response.data.token)); // Зберігаємо токен
                //Alert.alert('Success', 'Login successful');
                router.navigate('mannequin');
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
        } catch
            (error) {
            Alert.alert('Error', 'Unexpected error.');
        }
    };

    return (
        <ThemedView style={styles.titleContainer}>
            <HeadingText text={SIGN_UP_TEXT} />
            <ThemedView style={styles.buttons}>
                <AppLogin />
                <DecoratedText text={OR_TEXT} />

                <LoginForm
                    signupForm={false}
                    control={control}
                    errors={errors}
                    getValues={getValues}
                />

                <ButtonWithBackground
                    text={LOGIN_BUTTON_TEXT}
                    onPress={handleSubmit(onSubmitLoginForm)}
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