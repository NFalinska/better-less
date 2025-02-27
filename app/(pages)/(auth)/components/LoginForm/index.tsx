import React from 'react'
import TextField from '@/components/TextField'
import { CONFIRM_PASSWORD_PLACEHOLDER, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from '@/constants/string'

type Props = {
    signupForm?: boolean;
}

export default function LoginForm({ signupForm }: Props) {
    return (
        <>
            <TextField placeholder={EMAIL_PLACEHOLDER} keyboardType={'email-address'} />
            <TextField placeholder={PASSWORD_PLACEHOLDER} keyboardType={'email-address'} secureTextEntry={true} />
            {signupForm && <TextField placeholder={CONFIRM_PASSWORD_PLACEHOLDER} keyboardType={'email-address'} secureTextEntry={true} />}
        </>
    )
}

