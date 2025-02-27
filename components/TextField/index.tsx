import { TextInput, StyleSheet } from "react-native";

type Props = {
    placeholder: string;
    keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
    secureTextEntry?: boolean;
};

const TextField = ({ placeholder, keyboardType, secureTextEntry = false }: Props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor="black"
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        fontFamily: 'PTSerif_700Bold',
        paddingLeft: '8%',
        color: 'black',
        overflow: 'hidden'
    },
});

export default TextField;