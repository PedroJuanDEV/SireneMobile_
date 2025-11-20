import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const primaryColor = '#550D08'; 
const placeholderColor = '#666666'; 

const logoSource = require('../../assets/images/LogoSirene.png');

const LoginScreen = () => {
    
    const router = useRouter(); 
    
    const handleLogin = () => {
        // Navegação explícita para o arquivo Inicial dentro do grupo (tabs)
        // Isso resolve o erro 'Unmatched Route' forçando o carregamento da tela correta.
        router.replace('/(tabs)/Inicial'); 
        console.log('Login bem-sucedido. Redirecionando para a Página Inicial.');
    };
    
    const handleForgotPassword = () => {
        router.push('RecuperarSenha1'); 
        console.log('Navegando para RecuperarSenha1');
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Image 
                    source={logoSource} 
                    style={styles.logo} 
                    resizeMode="contain"
                />
            </View>

            
            <View style={styles.loginCard}>
                <Text style={styles.title}>LOGIN</Text>
                
                
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, styles.floatingLabel]}>CPF/Matrícula</Text>
                    <View style={styles.boxInput}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={placeholderColor}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, styles.floatingLabel]}>Senha</Text>
                    <View style={styles.boxInput}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={placeholderColor}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>Esqueceu sua Senha?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
    },
    header: {
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.35, 
        height: width * 0.35, 
        marginTop: 40,
    },
    loginCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 40,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
        position: 'relative', 
    },
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
    loginButton: {
        backgroundColor: primaryColor,
        width: '80%',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: primaryColor,
        fontSize: 14,
    },
});

export default LoginScreen;