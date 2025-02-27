import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ButtonIcon } from '@/components/ButtonIcon'
import { APPLE_LOGIN_TEXT, GOOGLE_LOGIN_TEXT } from '@/constants/string'

export default function AppLogin() {
    return (
        <ThemedView>
            <ButtonIcon
                iconSource={require('@/assets/images/google-icon.png')}
                text={GOOGLE_LOGIN_TEXT}
                onPress={() => console.log(GOOGLE_LOGIN_TEXT)}
            />
            <ButtonIcon
                iconSource={require('@/assets/images/apple-icon.png')}
                text={APPLE_LOGIN_TEXT}
                onPress={() => console.log(APPLE_LOGIN_TEXT)}
            />
        </ThemedView>
    )
}

