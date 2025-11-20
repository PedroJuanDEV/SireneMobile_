import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // 🎯 Adicionado 'Image'

const primaryColor = '#550D08'; 
const textColor = '#333333';
const secondaryTextColor = '#666666';
const cardBackgroundColor = '#FFFFFF';


const profileImageSource = require('@/assets/images/profile.jpeg'); 

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
    
    const handleLogout = () => {
        router.replace('/(auth)/Login');
    };

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
                    
                    <Text style={styles.userName}>Pedro Juan</Text>
                    <Text style={styles.userRole}>Capitão</Text>
                </View>

                
                <InfoCard title="Informações da conta">
                    <InfoItem label="E-mail" value="pedrojuan@email.com" />
                    <InfoItem label="Número de contato" value="81 99999-9999" />
                    <InfoItem label="Função" value="Operador de campo" />
                </InfoCard>

                <InfoCard title="Informações operacionais">
                    <InfoItem label="Matrícula" value="12345" />
                    <InfoItem label="Viatura" value="VTR-457" />
                    <InfoItem label="Turno" value="Manhã - Tarde" />
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
        overflow: 'hidden', // 🎯 CRUCIAL: Garante que a imagem seja cortada em círculo
    },
    // 🎯 NOVO ESTILO: Garante que a imagem preencha e seja circular
    profileImage: { 
        width: '100%',
        height: '100%',
        borderRadius: 50, // Opcional, mas garante o formato se o container falhar
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