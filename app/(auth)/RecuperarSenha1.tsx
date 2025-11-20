import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const primaryColor = '#550D08'; 
const placeholderColor = '#666666'; 
const logoSource = require('../../assets/images/LogoSirene.png');


const InputIntegrado: React.FC<{ label: string, value: string, onChangeText: (text: string) => void, keyboardType?: 'numeric' | 'default', secureTextEntry?: boolean }> = ({ label, value, onChangeText, keyboardType = 'default', secureTextEntry = false }) => (
    <View style={stylesIntegrado.inputGroup}>
       
        <Text style={[stylesIntegrado.inputLabel, stylesIntegrado.floatingLabel]}>{label}</Text>
        <View style={stylesIntegrado.boxInput}>
            <TextInput
                style={stylesIntegrado.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderColor}
            />
        </View>
    </View>
);

const RecuperarSenha1: React.FC = () => {
    const router = useRouter(); 
    const [matricula, setMatricula] = useState('');
    const [cpf, setCpf] = useState('');

    const handleAvancar = () => {
        if (!matricula || !cpf) {
            Alert.alert('Erro', 'Por favor, preencha Matrícula e CPF.');
            return;
        }

        router.push({
            pathname: 'RecuperarSenha2',
            params: { matricula: matricula, cpf: cpf },
        });
    };

    const handleCancelar = () => {
        router.replace('Login'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Image 
                    source={logoSource} 
                    style={styles.logo}
                    resizeMode="contain"
                />
                
            </View>

            
            <View style={styles.formContainer}>
                <Text style={styles.title}>RECUPERAR SENHA</Text>

                <InputIntegrado 
                    label="CPF/Matrícula" 
                    keyboardType="numeric"
                    value={matricula}
                    onChangeText={setMatricula}
                />
                <InputIntegrado 
                    label="CPF"
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={setCpf}
                />

                
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.cancelButton, styles.buttonBase]} onPress={handleCancelar}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.avancarButton, styles.buttonBase]} onPress={handleAvancar}>
                        <Text style={styles.avancarButtonText}>Avançar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const stylesIntegrado = StyleSheet.create({
    inputGroup: { width: '100%', marginBottom: 20, position: 'relative' },
    boxInput: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: primaryColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50, 
        justifyContent: 'center',
    },
    inputLabel: {
        color: primaryColor,
        fontSize: 14,
        marginBottom: 5,
    },
    floatingLabel: {
        position: 'absolute',
        top: -10, 
        left: 10,
        zIndex: 10,
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 5,
        fontSize: 12, 
    },
    input: {
        height: 40,
        borderBottomWidth: 0, 
        paddingHorizontal: 0,
        fontSize: 16,
        color: '#000000',
    },
});

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: primaryColor },
    header: { height: height * 0.35, backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center' },
    logo: { width: width * 0.35, height: width * 0.35, marginTop: 40 },
    appName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    appTagline: { color: '#FFF', fontSize: 10 },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30, 
        paddingTop: 30,
        alignItems: 'center',
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#000000', marginBottom: 40 },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 0,
    },
    buttonBase: { width: '45%', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
    cancelButton: { borderColor: primaryColor, borderWidth: 1, marginRight: 10 },
    cancelButtonText: { color: primaryColor, fontSize: 16, fontWeight: 'bold' },
    avancarButton: { backgroundColor: primaryColor, marginLeft: 10 },
    avancarButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default RecuperarSenha1;