import { useFormStore } from '@/src/context/FormStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const primaryColor = '#550D08'; 
const cardBackgroundColor = '#FFFFFF';

const FORMULARIOS = [
    
    { title: 'Formulário de atendimento', subtitle: 'BÁSICO', color: '#b8b7b7ff', route: '/Basico/forms1', nature: 'Natureza 1' },
    { title: 'Formulário de atendimento', subtitle: 'PRÉ-HOSPITALAR – CVI', color: '#1E90FF', route: '/FormPreHospitalar/forms1', nature: 'Natureza 2' }, 
    { title: 'Formulário de atendimento', subtitle: 'INCÊNDIO', color: '#FF4500', route: '/incendio/forms1', nature: 'Natureza 3' },
    { title: 'Formulário de atendimento', subtitle: 'SALVAMENTO', color: '#FF8C00', route: '/salvamento/forms1', nature: 'Natureza 4' },
    { title: 'Formulário de atendimento', subtitle: 'PRODUTOS PERIGOSOS', color: '#FFD700', route: '/perigosos/forms1', nature: 'Natureza 5' },
    { title: 'Formulário de atendimento', subtitle: 'PREVENÇÃO', color: '#32CD32', route: '/prevencao/forms1', nature: 'Natureza 6' },
];

const FormularioButton: React.FC<{ data: typeof FORMULARIOS[0]; onPress: (route: string) => void }> = ({ data, onPress }) => (
    <TouchableOpacity 
        style={[styles.button, { backgroundColor: data.color }]}
        onPress={() => onPress(data.route)}
    >
        <Text style={styles.buttonTitle}>{data.title}</Text>
        <Text style={styles.buttonSubtitle}>{data.subtitle}</Text>
        {data.nature && (
            <Text style={styles.buttonNature}>{data.nature}</Text>
        )}
    </TouchableOpacity>
);

export default function NovoScreen() {
    
    const router = useRouter(); 
    const store = useFormStore();

    const handleFormSelection = (route: string) => {
        if (route.startsWith('/')) {
            router.push(route); 
        } else {
            console.warn(`Rota inválida: ${route}`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Registro-Ocorrências</Text>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={async () => {
                    try {
                        const res = await store.syncAll();
                        Alert.alert('Sincronização', `Sincronizados: ${res.synced}, falhas: ${res.failed}`);
                    } catch (err) {
                        console.warn('Erro ao sincronizar', err);
                        Alert.alert('Erro', 'Falha ao sincronizar registros.');
                    }
                }}>
                    <Text style={{ color: '#007AFF' }}>Sincronizar</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                {FORMULARIOS.map((form, index) => (
                    <FormularioButton 
                        key={index}
                        data={form}
                        onPress={handleFormSelection}
                    />
                ))}

                <View style={{ height: 100 }} /> 
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: cardBackgroundColor,
    },
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollViewContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        padding: 20,
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: cardBackgroundColor,
    },
    buttonSubtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: cardBackgroundColor,
        marginTop: 2,
        marginBottom: 5,
    },
    buttonNature: {
        fontSize: 12,
        color: cardBackgroundColor,
    }
});