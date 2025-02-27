import { Image, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'

export default function AuthLayout() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#aaaaa', dark: '#1D3D47' }}
      headerImage={
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={require('@/assets/images/main-logo.png')}
            style={{ width: 350, height: 100, resizeMode: 'contain' }}
          />
        </View>
      }
    >
      <Slot />
    </ParallaxScrollView>
  )
}