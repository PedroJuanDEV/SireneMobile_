import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../../src/api/config';

const { width, height } = Dimensions.get('window');

const primaryColor = '#550D08'; 
const placeholderColor = '#666666'; 

const logoSource = require('../../assets/images/LogoSirene.png');

const LoginScreen = () => {
    
    const router = useRouter();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        try {
            console.debug('[Login] URL:', API_BASE_URL + '/auth/login');
            const payload = { matricula: String(matricula), senha: String(senha) };
            console.debug('[Login] payload:', JSON.stringify(payload));
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (!res.ok) {
                const errText = await res.text();
                console.error('Erro no login:', res.status, errText);
                Alert.alert('Erro', 'Credenciais inválidas ou erro no servidor.');
                return;
            }
            const body = await res.json();
            const token = body?.data?.token || body?.token || body?.data?.accessToken;
            if (!token) {
                console.error('Resposta sem token:', body);
                Alert.alert('Erro', 'Resposta do servidor inválida.');
                return;
            }
            await SecureStore.setItemAsync('token', token);
            console.log('Login bem-sucedido. Token salvo. Redirecionando para a Página Inicial.');
            router.replace('/(tabs)/Inicial');
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.error('Requisição abortada:', error);
                Alert.alert('Erro', 'Tempo de conexão esgotado. Verifique a rede.');
            } else {
                console.error('Erro no login (catch):', error);
                Alert.alert('Erro', 'Falha na requisição de login. Veja o console para mais detalhes.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleForgotPassword = () => {
        router.push('/RecuperarSenha1'); 
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
                            value={matricula}
                            onChangeText={setMatricula}
                            autoCapitalize="none"
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
                            value={senha}
                            onChangeText={setSenha}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>LOGIN</Text>
                    )}
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