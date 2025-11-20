import { useRouter } from 'expo-router'; // 🎯 Importando o hook de roteamento
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const primaryColor = '#550D08'; 
const cardBackgroundColor = '#FFFFFF';


const FORMULARIOS = [
    { title: 'Formulário de atendimento', subtitle: 'BÁSICO', color: '#AAAAAA', route: 'FormBasico' },
    { title: 'Formulário de atendimento', subtitle: 'PRÉ-HOSPITALAR – CVI', color: '#1E90FF', route: 'FormPreHospitalar', nature: 'Natureza 1' },
    { title: 'Formulário de atendimento', subtitle: 'INCÊNDIO', color: '#FF4500', route: 'FormIncendio', nature: 'Natureza 2' },
    { title: 'Formulário de atendimento', subtitle: 'SALVAMENTO', color: '#FF8C00', route: 'FormSalvamento', nature: 'Natureza 3' },
    { title: 'Formulário de atendimento', subtitle: 'PRODUTOS PERIGOSOS', color: '#FFD700', route: 'FormPerigosos', nature: 'Natureza 4' },
    { title: 'Formulário de atendimento', subtitle: 'PREVENÇÃO', color: '#32CD32', route: 'FormPrevencao', nature: 'Natureza 5' },
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

    const handleFormSelection = (route: string) => {
      
        router.push(route); 
        console.log(`Navegar para a rota do formulário: ${route}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Registro-Ocorrências</Text>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                {FORMULARIOS.map((form, index) => (
                    <FormularioButton 
                        key={index}
                        data={form}
                        onPress={handleFormSelection}
                    />
                ))}

                {/* Espaçamento para a Tab Bar */}
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