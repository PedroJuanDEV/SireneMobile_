import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'; // 🎯 Adicionado 'Image'
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@/src/api/config';

const primaryColor = '#550D08'; 
const textColor = '#333333';
const secondaryTextColor = '#666666';
const cardBackgroundColor = '#FFFFFF';


const profileImageSource = require('@/assets/images/profile.jpg'); 

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.infoCard}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>
      {children}
    </View>
  </View>
);

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function PerfilScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    const handleLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
        } catch (err) {
            console.warn('Erro ao remover token', err);
        }
        router.replace('/(auth)/Login');
    };

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                if (!token) {
                    router.replace('/(auth)/Login');
                    return;
                }

                const res = await fetch(`${API_BASE_URL}/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!mounted) return;

                if (!res.ok) {
                    // token inválido ou outro erro
                    const text = await res.text();
                    console.warn('auth/me erro:', res.status, text);
                    Alert.alert('Erro', 'Não foi possível carregar seu perfil. Faça login novamente.');
                    await SecureStore.deleteItemAsync('token');
                    router.replace('/(auth)/Login');
                    return;
                }

                const data = await res.json();
                if (!mounted) return;
                setProfile(data?.data || data || null);
            } catch (error) {
                console.warn('Erro ao obter perfil', error);
                Alert.alert('Erro', 'Erro ao carregar perfil. Verifique sua conexão.');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();

        return () => { mounted = false; };
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                
                <View style={styles.headerBackground}>
                    
                    
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={profileImageSource} 
                            style={styles.profileImage} 
                            resizeMode="cover"
                        />
                    </View>
                    
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" style={{ marginTop: 10 }} />
                    ) : (
                        <>
                            <Text style={styles.userName}>{profile?.nome || profile?.name || 'Usuário'}</Text>
                            <Text style={styles.userRole}>{profile?.funcao || profile?.role || ''}</Text>
                        </>
                    )}
                </View>

                
                <InfoCard title="Informações da conta">
                    <InfoItem label="E-mail" value={profile?.email || profile?.username || ''} />
                    <InfoItem label="Número de contato" value={profile?.telefone || profile?.phone || ''} />
                    <InfoItem label="Função" value={profile?.funcao || profile?.role || ''} />
                </InfoCard>

                <InfoCard title="Informações operacionais">
                    <InfoItem label="Matrícula" value={profile?.matricula?.toString?.() || ''} />
                    <InfoItem label="Viatura" value={profile?.viatura || ''} />
                    <InfoItem label="Turno" value={profile?.turno || ''} />
                </InfoCard>

                {/* Botão de Sair */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={24} color={primaryColor} />
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>

                <View style={{ height: 90 }} /> 
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5', 
    },
    scrollViewContent: {
        paddingBottom: 20, 
    },
    headerBackground: {
        backgroundColor: primaryColor,
        paddingVertical: 30,
        alignItems: 'center',
        marginBottom: -60,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF', 
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E0E0E0',
        borderWidth: 2,
        marginBottom: 10,
        overflow: 'hidden', 
    },
    
    profileImage: { 
        width: '100%',
        height: '100%',
        borderRadius: 50, 
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 10,
    },
    userRole: {
        fontSize: 16,
        color: '#E0E0E0',
    },
    infoCard: {
        backgroundColor: cardBackgroundColor,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 70,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: 15,
    },
    cardContent: {},
    infoItem: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: secondaryTextColor,
        fontWeight: '500',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: textColor,
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: cardBackgroundColor,
        borderRadius: 10,
        marginHorizontal: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor,
        marginLeft: 10,
    },
});