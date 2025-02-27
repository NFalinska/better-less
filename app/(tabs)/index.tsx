import { Image, StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { useFonts } from 'expo-font';
import { ButtonIcon } from '@/components/ButtonIcon';
import { DecoratedText } from '@/components/DecoratedText';
import { ButtonWithBackground } from '@/components/ButtonWithBgn';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>{SIGN_UP_TEXT}</ThemedText>
        <ThemedView style={styles.buttons}>
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
          <DecoratedText text={OR_TEXT} />
          <TextField placeholder={EMAIL_PLACEHOLDER} keyboardType={'email-address'}/>
          <TextField placeholder={PASSWORD_PLACEHOLDER} keyboardType={'email-address'} secureTextEntry={true}/>
          <TextField placeholder={CONFIRM_PASSWORD_PLACEHOLDER} keyboardType={'email-address'} secureTextEntry={true}/>
          <ThemedText type="title" style={styles.subTitle}>
            {TERMS_TEXT}
            <Text style={styles.terms}> {TERMS_LINK_TEXT} </Text>
          </ThemedText>
          <ButtonWithBackground
            text={SIGN_UP_BUTTON_TEXT}
            onPress={() => console.log(SIGN_UP_BUTTON_TEXT)}
            backgroundImage={require('@/assets/images/button-bgd.png')}
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 0,
    marginRight: '5%',
    marginBottom: 20,
    marginLeft: '5%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'PTSerif_700Bold',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttons: {
    marginTop: 25,
  },
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
