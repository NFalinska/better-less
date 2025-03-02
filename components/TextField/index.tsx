import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { TextInput, StyleSheet } from "react-native";

export type FieldType = 'email' | 'password' | 'number'

type Props<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    placeholder: string;
    keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
    secureTextEntry?: boolean;
    control: Control<TFormValues, any>;
    rules?: Omit<RegisterOptions<TFormValues>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
};

export function TextField<TFormValues extends FieldValues>({
    name,
    control,
    rules,
    placeholder,
    keyboardType,
    secureTextEntry
}: Props<TFormValues>
) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    style={styles.input}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor="black"
                    secureTextEntry={secureTextEntry}
                />
            )}
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