import React from 'react';
import { View, Text } from 'react-native';
import { Control, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { CONFIRM_PASSWORD_PLACEHOLDER, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from '@/constants/string';
import { TextField } from '@/components/TextField';

type FormData = {
    email: string;
    password: string;
    confirmPassword?: string;
};

type Props = {
    signupForm?: boolean;
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
    getValues: UseFormGetValues<FormData>;
};

export default function LoginForm({ signupForm, control, errors, getValues }: Props) {
    return (
        <View>
            <TextField<FormData>
                name="email"
                control={control}
                placeholder={EMAIL_PLACEHOLDER}
                keyboardType="email-address"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/i,
                        message: 'Invalid email format',
                    },
                }}
            />
            {errors?.email && <Text>{errors.email.message}</Text>}

            <TextField<FormData>
                name="password"
                control={control}
                placeholder={PASSWORD_PLACEHOLDER}
                secureTextEntry={true}
                keyboardType="default"
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    },
                }}
            />
            {errors?.password && <Text>{errors.password.message}</Text>}

            {signupForm && (
                <TextField<FormData>
                    name="confirmPassword"
                    control={control}
                    placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
                    secureTextEntry={true}
                    keyboardType="default"
                    rules={{
                        required: 'Please confirm your password',
                        validate: (value) => value === getValues('password') || 'Passwords must match',
                    }}
                />
            )}
            {errors?.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
        </View>
    );
}



